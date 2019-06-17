"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(date) {
    var year = (date.getFullYear() % 100).toString();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = (date.getDate()).toString().padStart(2, '0');
    var hours = (date.getHours()).toString().padStart(2, '0');
    var minutes = (date.getMinutes()).toString().padStart(2, '0');
    var seconds = (date.getSeconds()).toString().padStart(2, '0');
    var millseconds = (date.getMilliseconds()).toString().padStart(3, '0');
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "." + millseconds;
}
exports.default = format;
// /**
//  * test
//  */
// import assert from 'assert'
// describe('datetime formatter', function() {
//   it('should match format', function() {
//     assert(/^\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}$/.test(format(new Date())))
//   })
// })
