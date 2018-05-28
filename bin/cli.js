#!/usr/bin/env node

const { default: create } = require('../lib')
const argv = process.argv.slice(2)

create(argv)
