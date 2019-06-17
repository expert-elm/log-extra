"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function startsCase(string) {
    return string.replace(/^([^])/, function (_, a) { return a.toUpperCase(); });
}
exports.default = startsCase;
