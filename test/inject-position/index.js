import log from '@rabbitcc/log'

function main() {
    log.info('foo', 'bar', 'baz')
    log.warn('foo', 'bar', '42')
    function main2() {
        log.error('foo', 'bar', 'error')
        log.fatal('foo', 'bar', 'fatal')
    }
    main2()
}

main()
