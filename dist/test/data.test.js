"use strict";

var data = _interopRequireWildcard(require("../scripts/data"));

var barackObamaSpeech = _interopRequireWildcard(require("../input/barack.txt"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// Matchers:
// Commoness
// - toBe() --> exact equality
// - toEqual() --> equality of object 
// - not --> opposite of a matcher
// Truthiness
// - toBeNull
// - toBeUndefined
// - toBeDefined
// - toBeTruthy
// - toBeFalsy
// Strings
// - toMatch(regex)
// Arrays
// - toContain()
test('Obama mentions his sister Auma', () => {
  return data.toTextArray(barackObamaSpeech).then(data => {
    expect(data).toContain('Auma');
  });
});