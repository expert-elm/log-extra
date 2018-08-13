import log from '@rabbitcc/log'

function main() {
    log.info('foo', 'bar', 'baz')
    log.warn('foo', 'bar', '42')
}

main()
