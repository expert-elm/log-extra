"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var level_parser_1 = __importDefault(require("./level-parser"));
test('number', function () {
    expect(level_parser_1.default("42")).toBe(42);
});
test('string', function () {
    expect(level_parser_1.default("info")).toBe(60);
});
test('provider string upper cased', function () {
    expect(level_parser_1.default("INFO")).toBe(60);
});
test('provider string invalid', function () {
    expect(function () { return level_parser_1.default("foo"); }).toThrowError("Given LOGGER_LEVEL was invaild, foo");
});
