"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var terminal_client_1 = __importStar(require("./terminal-client"));
describe('terminal client', function () {
    it('should apply position tpl', function () {
        expect(terminal_client_1.makePositionTpl({ line: '1', column: '2', filename: 'foo' })).toBe(chalk_1.default.gray("@ foo:1,2"));
    });
    it('should apply tpl', function () {
        expect(terminal_client_1.makeTpl('foo', 'bar', 'baz', 'qux')).toBe(chalk_1.default.bold('bar') + "| baz [  FOO] <" + chalk_1.default.bold('qux') + ">");
    });
    it('should apply tpl with name and level', function () {
        expect(terminal_client_1.makeTpl('foo', 'ba', 'baz', 'qux')).toBe(chalk_1.default.bold(' ba') + "| baz [  FOO] <" + chalk_1.default.bold('qux') + ">");
    });
    it('should apply tpl slice name and level', function () {
        expect(terminal_client_1.makeTpl('foooo', 'barr', 'baz', 'qux')).toBe(chalk_1.default.bold('bar') + "| baz [FOOOO] <" + chalk_1.default.bold('qux') + ">");
    });
    it('should throw when color not given', function () {
        expect(function () {
            terminal_client_1.default({ level: 'debug', color: [], weight: 42 }, {}, '', '', '', '');
        }).toThrowError("Can't find provider color, the color should be [color1, color2, color3, ...and more optional colors]");
    });
});
