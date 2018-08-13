/**
 * babel plugin, inject origin position to log
 *
 * @flow
 */

type Options = {
  test?: RegExp
}

export default function plugin({ types: t }: any,
                               { test = /^@rabbitcc\/log/ }: Options) {

  const caller = []

  return {
    visitor: {
      ImportDeclaration(path: any) {
        const value = path.node.source.value

        if(!test.test(value)) {
          return
        }

        const specs = path.node.specifiers

        specs.forEach(spec => {
          if(t.isImportDefaultSpecifier(spec)) {
            caller.push({
              callee: 'MemberExpression',
              name: spec.local.name
            })
          } else if(t.isImportSpecifier(spec)) {
            caller.push({
              callee: 'Identifier',
              name: spec.local.name
            })
          } else if(t.isImportNamespaceSpecifier(spec)) {
            caller.push({
              callee: 'MemberExpression',
              name: spec.local.name
            })
          }
        })

        return
      },
      CallExpression(path: any, { filename }: Object) {

        if(!path.node.loc) {
          return
        }

        const callee = path.node.callee
        const args = path.node.arguments
        const { line, column } = path.node.loc.start


        if(t.isIdentifier(callee)) {
          /**
           * match
           *
           * ```js`
           * info('foo', 'bar', 'baz')
           * ````
           *
           * convernt to:
           *
           * ```js
           * info.bind({ position: { ... } })('foo', 'bar', 'baz')
           * ```
           */
          replaceFilter('Identifier', callee => callee.name)

          return
        } else if(t.isMemberExpression(callee)) {
          /**
           * match
           *
           * ```js`
           * log.info('foo', 'bar', 'baz')
           * ````
           *
           * convernt to:
           *
           * ```js
           * log.info.bind({ position: { ... } })('foo', 'bar', 'baz')
           * ```
           */
          replaceFilter('MemberExpression', callee => callee.object.name)

          return
        }

        function replaceFilter(target, getName) {
          caller.filter(c => target === c.callee).forEach(({ name }) => {
            if(name !== getName(callee)) {
              return
            }

            replaceWithBind()
          })
        }


        function replaceWithBind() {
          path.replaceWith(
            t.callExpression(
              t.callExpression(
                t.memberExpression(
                  callee,
                  t.identifier('bind')
                ),
                [
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier('position'),
                      t.objectExpression([
                        t.ObjectProperty(
                          t.identifier('line'),
                          t.stringLiteral(line.toString())
                        ),
                        t.ObjectProperty(
                          t.identifier('column'),
                          t.stringLiteral((column + 1).toString())
                        ),
                        t.ObjectProperty(
                          t.identifier('filename'),
                          t.stringLiteral(filename || 'unknow')
                        )
                      ])
                    )
                  ])
                ]
              ),
              args
            )
          )
        }

        return
      }
    }
  }
}


/**
 * test
 */

import assert from 'assert'
import { transform } from '@babel/core'

describe('inject position plugin', function() {
  it('should replaced by normal import', function() {
    const code = `\
import { info } from '@rabbitcc/log'

info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [plugin]
    })

    assert(result.code == `\
import { info } from '@rabbitcc/log';
info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })

  it('should replaced by default import', function() {
    const code = `\
import log from '@rabbitcc/log'

log.info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [plugin]
    })

    assert(result.code == `\
import log from '@rabbitcc/log';
log.info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })

  it('should replaced by namespace import', function() {
    const code = `\
import * as log from '@rabbitcc/log'

log.info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [plugin]
    })

    assert(result.code == `\
import * as log from '@rabbitcc/log';
log.info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })

  it('should replaced by normal import and default import', function() {
    const code = `\
import log, { info } from '@rabbitcc/log'

log.info('foo', 'bar', 'baz')
info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [plugin]
    })

    assert(result.code == `\
import log, { info } from '@rabbitcc/log';
log.info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');
info.bind({
  position: {
    line: "4",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })

  it('should replaced by default import and namespace import', function() {
    const code = `\
import log, * as log1 from '@rabbitcc/log'

log.info('foo', 'bar', 'baz')
log1.info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [plugin]
    })

    assert(result.code == `\
import log, * as log1 from '@rabbitcc/log';
log.info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');
log1.info.bind({
  position: {
    line: "4",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })

  it('should support custom test', function() {
    const code = `\
import { info } from 'foo'

info('foo', 'bar', 'baz')
`

    const result = transform(code, {
      babelrc: false,
      plugins: [[plugin, { test: /^foo/ }]]
    })

    assert(result.code == `\
import { info } from 'foo';
info.bind({
  position: {
    line: "3",
    column: "1",
    filename: "unknow"
  }
})('foo', 'bar', 'baz');`)
  })
})
