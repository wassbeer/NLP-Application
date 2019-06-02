import * as fs from 'fs'
import { certainAdjective } from './prototypes'

module.exports = {
	toTextArray: (input) => {
		fs.readFile(input, (err, data) => {
			if (err) { throw err; }
			data.toString()
				.replace(/[!?.]/g, '[interpunction]')
				.replace(/[^a-zA-Z\d\s:]/g, '')
				.split(' ');
			return data;
		});
	},
	toCertainAdjectiveObj: (e) => {
		return new certainAdjective(e, 1);
	}
	// toUnique: (array) => {
	// 	array.sort((a, b) => { return (a.word - b.word) })
	// 		.filter((item, pos, ary) => {
	// 			return !pos || item != ary[pos - 1]	;
	// 		});
	// 	return array;
	// },
}
