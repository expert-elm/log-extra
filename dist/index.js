"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var logger_1 = tslib_1.__importDefault(require("./logger"));
var terminal_1 = tslib_1.__importDefault(require("./provider/terminal"));
exports.default = logger_1.default(terminal_1.default);
var logger_2 = require("./logger");
exports.createLogger = logger_2.default;
var level_1 = require("./level");
exports.parseLevel = level_1.parseLevel;
//# sourceMappingURL=index.js.map