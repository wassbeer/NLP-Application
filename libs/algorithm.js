import * as fs from 'fs';
import { bigramObject, potentialAdjective, trueAdjective, csvAdjective } from './libs/prototypes';
import * as lexicon from './libs/lexicon';
import * as bigramProbabilities from './libs/bigramProbabilities';
import * as stringify from 'csv-stringify';

export function returnAdjectives(text) {
	const textArray = prepareData(text),
		certainJJs = textArray.filter(isCertainAdjective),
		probableJJs = filterProbableAdjectives(textArray);
	// format data 
	//return
}

function prepareData(input	) {
	fs.readFile(input, (err, data) => {
		if (err) { throw err; }
		let arrayOfTextWords = data.toString()
			.replace(/[!?.]/g, '[interpunction]')
			.replace(/[^a-zA-Z\d\s:]/g, '') // minimize 2 replaces to 1 replace
			.split(' ');
		return arrayOfTextWords;
	})
}

function isCertainAdjective(wordTags) {
	return wordTags && wordTags.length === 1 && wordTags === 'JJ';
	// let certainAdjectives = [];
	// for (let i = 0; i < arr.length + 2; i++) {
	// 	let wordTags = lexicon[arr[i - 1]],
	// 		position = i - 1,
	// 		frequency = 1;
	// 	if (wordTags && wordTags.length === 1 && wordTags === 'JJ') {
	// 		let certain = new trueAdjective(`flare.sure.${arr[i-1]}`, wordTags, position, frequency);
	// 		certainAdjectives.push(certain);
	// 	}
	// return certainAdjectives;
	// }
}

function findUncertainAdjectives(wordTags) {
	return wordTags && wordTags.length > 1 && wordTags.indexOf('JJ') > -1;
}

function definePotAdjContext(arr) {
	// let ambiguousAdjectives = [];
	// 	let wordTags = lexicon[arr[i - 1]],
	// 		beforeTags = lexicon[arr[i - 2]],
	// 		afterTags = lexicon[arr[i]],
	// 		position = i - 1,
	// 		frequency = 1;
	// 	if (wordTags && beforeTags) {
	// 		if (wordTags === 'JJ') { // If  there is an adjective
	// 			if (wordTags.length > 1) { // If the JJ tag is not the only tag
	// 				let bigrams = [],
	// 					tagProbability = 0.66;
	// 				wordTags.forEach((wordTag, j) => {
	// 					let lexiconBigram, probability, tagSeq = [],
	// 						tagProbability = tagProbability / (Math.pow(3, j + 1));
	// 					if (beforeTags[0]  && beforeTags[0] !== 'XX') {
	// 						lexiconBigram = beforeTags[0] + '_' + wordTag;
	// 						probability = bigramProbabilities[lexiconBigram] * tagProbability;
	// 						tagSeq.push(beforeTags[0], wordTag, 'XX');
	// 						bigramObj = new bigramObject(tagSeq, probability);
	// 						bigrams.push(bigramObj);
	// 					}
	// 					if (afterTags) {
	// 						lexiconBigram = wordTag + '_' + afterTags[0];
	// 						probability = bigramProbabilities[lexiconBigram] * tagProbability,
	// 						tagSeq.push('XX', wordTag, afterTags[0]);;
	// 						bigramObj = new bigramObject(tagSeq, probability);
	// 						bigrams.push(bigramObj);    
	// 					}

	// 					/*
	// 					[  {
	// 						wordTags: ['DT', 'NNP', 'XX'],
	// 						probability: 0.00010384362139917695 
	// 						},
	// 						{
	// 						wordTags: ['DT', 'JJ', 'XX'],
	// 						probability: 0.0000024109129705837526 
	// 						},
	// 						{
	// 						wordTags: ['DT', 'NN', 'XX'],
	// 						probability: 2.1820756103583357e-8 
	// 						}
	// 					]
	// 					*/

	// 					ambiguous = new potentialAdjective(`flare.unsure.${arr[i-1]}`, wordTags, bigrams, position, frequency);
	// 					ambiguousAdjectives.push(ambiguous);
	// 				}	
	// 			}
	// 		}
	// 	}
	// }
	// return ambiguousAdjectives;
}

function filterProbableAdjectives(arr) {
	const potAdjs = findUncertainAdjectives(arr),
		potAdjWithContexts = definePotAdjContext(potAdjs),
		probableAdjectives = potAdjWithContexts.filter(isProbableAdjective);
	return probableAdjectives;
}

// apply filter
function isProbableAdjective(ambAdj, j) {
	return ambAdj.bigrams[j].probability >= ambAdj.bigrams[j - 1].probability || ambAdj.bigrams[j - 1].probability === undefined;
	// function to return the most probably bigram tag is JJ
}

// 1.4 Process frequency

function formatData(array) { // --> trueAdjective, potentialAdjective formatting
	array.sort(function(a, b) { return (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0); });
	for (let j = 1; j < 50; j++) {
		for (let i = 1; i < array.length; i++) {
			if (array[i - 1].word === array[i].word) {
				array[i - 1].frequency = array[i - 1].frequency + 2;
				array.splice(i, 1)
			}
		}
	}
}

formatData(certainAdjective);

// 1.5 To CSV

let csvData = [];
for (let k = 0; k < certainAdjective.length; k++) {
	let word = certainAdjective[k].word,
		frequency = certainAdjective[k].frequency;
	csvData.push(new csvAdjective(word, frequency));
}
stringify(csvData, function(err, output) {
	newCsv = 'id,value' + '\n' + 'flare,' + '\n' + 'flare.vis,' + '\n' + output;
	fs.writeFile('./public/flare1.csv', newCsv, (err) => {
		if (err) { throw err }
	})
});