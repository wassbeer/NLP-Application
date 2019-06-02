"use strict";

var _prototypes = require("./libs/prototypes");

var stringify = _interopRequireWildcard(require("csv-stringify"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = {
  prepare: function (certainAndProbableAdjectives) {
    certainAndProbableAdjectives.map(e => {
      return new _prototypes.csvAdjective(e.word, e.frequency);
    });
    return certainAndProbableAdjectives;
  },
  toCSV: function (certainAndProbableAdjectives) {
    const csvData = this.prepare(certainAndProbableAdjectives);
    stringify(csvData, (err, output) => {
      if (err) {
        throw err;
      }

      const newCsv = 'id,value' + '\n' + 'flare,' + '\n' + 'flare.vis,' + '\n' + output,
            csvLocation = './../public/flare1.csv';
      fs.writeFile(csvLocation, newCsv, err => {
        if (err) {
          throw err;
        }
      });
    });
  }
};