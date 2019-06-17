"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handler(_a, _b, name, datetime, action, content) {
    var level = _a.level, color = _a.color;
    var position = (_b === void 0 ? {} : _b).position;
    if (!Array.isArray(color) || 0 === color.length) {
        throw new Error("Can't find provider color, the color should be [color1, color2, color3, ...and more optional colors]");
    }
    var is_fatal = 'fatal' === level;
    var style = is_fatal
        ? "background-color: " + color[1] + ";color: white;"
        : "color: " + color[1] + ";";
    var _c = makeTpl(level, style, name, datetime, action), header = _c[0], header_style = _c[1];
    return function () {
        var sp = content.split(/\r?\n/);
        var spliter = 1 === sp.length ? '-' : '|';
        sp.forEach(function (str) {
            if (!position) {
                console.log.apply(console, [
                    [header, spliter, str].join(' ')
                ].concat(header_style));
                return;
            }
            var _a = makePositionTpl(position), pos = _a[0], pos_style = _a[1];
            console.log.apply(console, [
                [header, pos, spliter, str].join(' ')
            ].concat(header_style, pos_style));
        });
    };
}
exports.default = handler;
function makeTpl(level, color, name, datetime, action) {
    return [
        "%c" + name.substr(0, 3).padStart(3, ' ') + "|%c%c " + datetime + " [" + level.toUpperCase().padStart(5, ' ') + "] %c%c<" + action + ">%c",
        [
            color + "font-weight: bolder;", '',
            "" + color, '',
            color + "font-weight: bolder;", ''
        ]
    ];
}
exports.makeTpl = makeTpl;
function makePositionTpl(_a) {
    var line = _a.line, column = _a.column, filename = _a.filename;
    return [
        "%c@ \"file:///" + filename.replace(/\\/g, '/').replace(/(\w):/, function (_, a) { return a.toUpperCase() + ':'; }) + ":" + line + ":" + column + "\"%c",
        [
            'color: gray;', ''
        ]
    ];
}
exports.makePositionTpl = makePositionTpl;
// /**
//  * test
//  */
// import assert from 'assert'
// import fs from 'fs'
// import puppeteer from 'puppeteer'
// describe('browser client', function() {
//   it('should apply position tpl', function() {
//     assert.deepStrictEqual(
//       makePositionTpl({ line: '1', column: '2', filename: 'foo' }),
//       [
//         '%c@ "file:///foo:1:2"%c',
//         [
//           'color: gray;', ''
//         ]
//       ]
//     )
//   })
//   it('should apply position tpl and format file path', function() {
//     assert.deepStrictEqual(
//       makePositionTpl({ line: '1', column: '2', filename: 'c:\\foo\\bar' }),
//       [
//         '%c@ "file:///C:/foo/bar:1:2"%c',
//         [
//           'color: gray;', ''
//         ]
//       ]
//     )
//   })
//   it('should apply tpl', function() {
//     assert.deepStrictEqual(
//       makeTpl('foo', 'color:#424242;', 'bar', 'baz', 'qux'),
//       [
//         '%cbar|%c%c baz [  FOO] %c%c<qux>%c',
//         [
//           `color:#424242;font-weight: bolder;`, '',
//           `color:#424242;`, '',
//           `color:#424242;font-weight: bolder;`, ''
//         ]
//       ]
//     )
//   })
//   it('should apply tpl and format name and level', function() {
//     assert.deepStrictEqual(
//       makeTpl('fo', 'color:#424242;', 'ba', 'baz', 'qux'),
//       [
//         '%c ba|%c%c baz [   FO] %c%c<qux>%c',
//         [
//           `color:#424242;font-weight: bolder;`, '',
//           `color:#424242;`, '',
//           `color:#424242;font-weight: bolder;`, ''
//         ]
//       ]
//     )
//   })
//   it('should apply tpl and slice name and level', function() {
//     assert.deepStrictEqual(
//       makeTpl('foooo', 'color:#424242;', 'barr', 'baz', 'qux'),
//       [
//         '%cbar|%c%c baz [FOOOO] %c%c<qux>%c',
//         [
//           `color:#424242;font-weight: bolder;`, '',
//           `color:#424242;`, '',
//           `color:#424242;font-weight: bolder;`, ''
//         ]
//       ]
//     )
//   })
//   it('should throw when color not given', function() {
//     assert.throws(
//       () => {
//         handler({ level: 'debug', color: [], weight: 42 }, {}, '', '', '', '')
//       },
//       // $FlowFixMe
//       {
//         name: 'Error',
//         message: `\
// Can't find provider color, the color should be \
// [color1, color2, color3, ...and more optional colors]`
//       }
//     )
//   })
//   it('should exec browser console', function(done) {
//     const script = fs.readFileSync('./browser.js', 'utf-8')
//     browserConsoleOutput({
//       requires: [
//         'process = {};process.env = {};',
//         script
//       ],
//       script: 'Logger.info("foo", "bar", "baz")'
//     }).catch(done).then(res => {
//       const str = res.shift()
//       assert(/%cfoo|%c%c \d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} [ INFO] %c%c<bar>%c - baz/.test(str))
//       assert.deepStrictEqual(
//         res,
//         [
//           'color: darkblue;font-weight: bolder;', '',
//           'color: darkblue;', '',
//           'color: darkblue;font-weight: bolder;', ''
//         ]
//       )
//       done()
//     })
//   })
//   it('should exec browser console with colorful logger level', function(done) {
//     const script = fs.readFileSync('./browser.js', 'utf-8')
//     browserConsoleOutput({
//       requires: [
//         'process = {};process.env = {};',
//         script
//       ],
//       script: 'Logger.warn("foo", "bar", "baz")'
//     }).catch(done).then(res => {
//       const str = res.shift()
//       assert(/%cfoo|%c%c \d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} [ INFO] %c%c<bar>%c - baz/.test(str))
//       assert.deepStrictEqual(
//         res,
//         [
//           'color: darkorange;font-weight: bolder;', '',
//           'color: darkorange;', '',
//           'color: darkorange;font-weight: bolder;', ''
//         ]
//       )
//       done()
//     })
//   })
//   it('should exec browser console background with fatal logger level', function(done) {
//     const script = fs.readFileSync('./browser.js', 'utf-8')
//     browserConsoleOutput({
//       requires: [
//         'process = {};process.env = {};',
//         script
//       ],
//       script: 'Logger.fatal("foo", "bar", "baz")'
//     }).catch(done).then(res => {
//       const str = res.shift()
//       assert(/%cfoo|%c%c \d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} [ INFO] %c%c<bar>%c - baz/.test(str))
//       assert.deepStrictEqual(
//         res,
//         [
//           'background-color: red;color: white;font-weight: bolder;', '',
//           'background-color: red;color: white;', '',
//           'background-color: red;color: white;font-weight: bolder;', ''
//         ]
//       )
//       done()
//     })
//   })
//   function browserConsoleOutput({ requires = [], script = '' }) {
//     return new Promise((res, rej) => {
//       puppeteer.launch().then(browser => {
//         browser.newPage().then(page => {
//           page.evaluate(requires.join(';;')).then(() => {
//             page.once('console', msg => {
//               Promise.all(msg.args().map(arg => arg.jsonValue())).then(args => {
//                 res(args)
//               }).catch(rej)
//             })
//             page.evaluate(script).catch(rej)
//           }).catch(rej)
//         }).catch(rej)
//       }).catch(rej)
//     })
//   }
// })
