"use strict";

var fs = _interopRequireWildcard(require("fs"));

var _prototypes = require("./prototypes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = {
  toTextArray: input => {
    fs.readFile(input, (err, data) => {
      if (err) {
        throw err;
      }

      data.toString().replace(/[!?.]/g, '[interpunction]').replace(/[^a-zA-Z\d\s:]/g, '').split(' ');
      return data;
    });
  },
  toCertainAdjectiveObj: e => {
    return new _prototypes.certainAdjective(e, 1);
  } // toUnique: (array) => {
  // 	array.sort((a, b) => { return (a.word - b.word) })
  // 		.filter((item, pos, ary) => {
  // 			return !pos || item != ary[pos - 1]	;
  // 		});
  // 	return array;
  // },

};