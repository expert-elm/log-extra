"use strict";
/**
 * terminal client for nodejs
 *
 * @flow
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var starts_case_1 = __importDefault(require("./starts-case"));
function handler(_a, _b, name, datetime, action, content) {
    var level = _a.level, color = _a.color;
    var position = (_b === void 0 ? {} : _b).position;
    if (!Array.isArray(color) || 0 === color.length) {
        throw new Error("Can't find provider color, the color should be [color1, color2, color3, ...and more optional colors]");
    }
    var colorfx = 'fatal' === level
        ? chalk_1.default["bg" + starts_case_1.default(color[0])]
        : chalk_1.default[color[0]];
    var tpl = colorfx(makeTpl(level, name, datetime, action));
    return function () {
        var sp = content.split(/\r?\n/);
        var spliter = 1 === sp.length ? '-' : '|';
        sp.forEach(function (str) {
            if (!position) {
                console.log(tpl, spliter, str);
                return;
            }
            console.log(tpl, makePositionTpl(position), spliter, str);
        });
    };
}
exports.default = handler;
function makeTpl(level, name, datetime, action) {
    return chalk_1.default.bold(name.substr(0, 3).padStart(3, ' ')) + "| " + datetime + " [" + level.toUpperCase().padStart(5, ' ') + "] <" + chalk_1.default.bold(action) + ">";
}
exports.makeTpl = makeTpl;
function makePositionTpl(_a) {
    var line = _a.line, column = _a.column, filename = _a.filename;
    return chalk_1.default.gray("@ " + filename + ":" + line + "," + column);
}
exports.makePositionTpl = makePositionTpl;
