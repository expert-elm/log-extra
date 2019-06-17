"use strict";
/**
 * logger
 *
 * A logger tool
 *
 * Logger format:
 *
 * ```
 *   Name| DateTime [Level] <Action> - Contents
 * ```
 *
 * Logger status:
 *
 * ```
 *   info, done, fail, warn
 * ```
 *
 * @evn LOGGER_ENV
 * @env LOGGER_APPLYCONSOLE
 * @env LOGGER_MOMENTFORMAT
 * @env LOGGER_FORMAT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_formater_1 = __importDefault(require("./datetime-formater"));
var default_provider_1 = __importDefault(require("./default-provider"));
var level_parser_1 = __importDefault(require("./level-parser"));
function createLogger(_a) {
    var provider = _a.provider, level = _a.level, handler = _a.handler;
    return function log(name, action, content) {
        if (provider.weight > level) {
            return;
        }
        var datetime = datetime_formater_1.default(new Date());
        /**
         * meta data
         */
        var metadata = this || {};
        handler(provider, metadata, name, datetime, action, String(content))();
    };
}
exports.createLogger = createLogger;
/**
 * export api
 */
var handler = require("./" + (process.env.TARGET || 'terminal') + "-client").default;
var level = process.env.DEBUG
    ? default_provider_1.default.debug.weight
    : process.env.LOGGER_LEVEL
        ? level_parser_1.default(process.env.LOGGER_LEVEL)
        : default_provider_1.default.info.weight;
exports.trace = createLogger({ handler: handler, level: level, provider: default_provider_1.default.trace });
exports.debug = createLogger({ handler: handler, level: level, provider: default_provider_1.default.debug });
exports.info = createLogger({ handler: handler, level: level, provider: default_provider_1.default.info });
exports.warn = createLogger({ handler: handler, level: level, provider: default_provider_1.default.warn });
exports.error = createLogger({ handler: handler, level: level, provider: default_provider_1.default.error });
exports.fatal = createLogger({ handler: handler, level: level, provider: default_provider_1.default.fatal });
exports.default = {
    trace: exports.trace,
    debug: exports.debug,
    info: exports.info,
    warn: exports.warn,
    error: exports.error,
    fatal: exports.fatal
};
