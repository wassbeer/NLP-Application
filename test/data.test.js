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

import * as data from '../scripts/data'
import * as barackObamaSpeech from '../input/barack.txt'

test('Obama mentions his sister Auma', () => {
    return data.toTextArray(barackObamaSpeech).then((data) => {
        expect(data).toContain('Auma');
    });
});
