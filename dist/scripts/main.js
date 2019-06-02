"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnAdjectives = returnAdjectives;

var _data = _interopRequireDefault(require("./data"));

var _adjective = _interopRequireDefault(require("./adjective"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function returnAdjectives(text) {
  const textArray = _data.default.toTextArray(text);

  const certainJJs = textArray.filter(_adjective.default.isCertain).map(_data.default.toCertainAdjectiveObj);
  return certainJJs; // const probableJJs = textArray
  // 	.filter(adjective.isPotential)
  // 	.filter(adjective.isProbable);
  // const certainAndProbableAdjectives = data.toUnique(certainJJs.concat(probableJJs));
  // return certainAndProbableAdjectives;
  // format.toCSV()
}