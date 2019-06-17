"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var default_provider_js_1 = __importDefault(require("./default-provider.js"));
function parse(input) {
    if ("number" === typeof input)
        return input;
    var num = parseInt(input);
    if (!isNaN(num))
        return num;
    var key = input.toString().trim().toLowerCase();
    var buildin = default_provider_js_1.default[key];
    if (undefined === buildin)
        throw new Error("Given LOGGER_LEVEL was invaild, " + key);
    return buildin.weight;
}
exports.default = parse;
