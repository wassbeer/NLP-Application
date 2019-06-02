import { bigramObject, potentialAdjective, certainAdjective } from './prototypes';
import * as lexicon from './lexicon';
import * as bigramProbabilities from './bigramProbabilities';
import * as data from './data'

module.exports = {
    isCertain: function(e) {
        return lexicon[e] && lexicon[e].length === 1 && lexicon[e][0] === 'JJ';
    },
    // isUncertain: function(e) {
    //     return lexicon[e] && lexicon[e].length > 1 && lexicon[e].indexOf('JJ') > -1;
    // },
    // isPotential: function(word, i, textArray) {
    //     if (this.isUncertain(word)) {
    //         let wordTags = lexicon[textArray[i - 1]],
    //             beforeTags = lexicon[textArray[i - 2]],
    //             afterTags = lexicon[textArray[i]];
    //         if (wordTags && beforeTags) {
    //             const bigrams = [],
    //                 tagProbability = 0.66;		
    //     // 				let bigrams = [],
    //     // 					tagProbability = 0.66;
    //     // 				wordTags.forEach((wordTag, j) => {
    //     // 					let lexiconBigram, probability, tagSeq = [],
    //     // 						tagProbability = tagProbability / (Math.pow(3, j + 1));
    //     // 					if (beforeTags[0]  && beforeTags[0] !== 'XX') {
    //     // 						lexiconBigram = beforeTags[0] + '_' + wordTag;
    //     // 						probability = bigramProbabilities[lexiconBigram] * tagProbability;
    //     // 						tagSeq.push(beforeTags[0], wordTag, 'XX');
    //     // 						bigramObj = new bigramObject(tagSeq, probability);
    //     // 						bigrams.push(bigramObj);
    //     // 					}
    //     // 					if (afterTags) {
    //     // 						lexiconBigram = wordTag + '_' + afterTags[0];
    //     // 						probability = bigramProbabilities[lexiconBigram] * tagProbability,
    //     // 						tagSeq.push('XX', wordTag, afterTags[0]);;
    //     // 						bigramObj = new bigramObject(tagSeq, probability);
    //     // 						bigrams.push(bigramObj);    
    //     // 					}
    
    //     // 					/*
    //     // 					[  {
    //     // 						wordTags: ['DT', 'NNP', 'XX'],
    //     // 						probability: 0.00010384362139917695 
    //     // 						},
    //     // 						{
    //     // 						wordTags: ['DT', 'JJ', 'XX'],
    //     // 						probability: 0.0000024109129705837526 
    //     // 						},
    //     // 						{
    //     // 						wordTags: ['DT', 'NN', 'XX'],
    //     // 						probability: 2.1820756103583357e-8 
    //     // 						}
    //     // 					]
    //     // 					*/
    
    //     // 					ambiguous = new potentialAdjective(`flare.unsure.${arr[i-1]}`, wordTags, bigrams, position, 1);
    //     // 					ambiguousAdjectives.push(ambiguous);
    //     // 				}	
    //     // 			}
    //     // 		}
    //     // 	}
    //     }
    //     return ambiguousAdjectives; 
    //     }
    
    //     const potAdjWithContexts = definePotAdjContext(potAdjs, arr),
    //         probableAdjectives = potAdjWithContexts.filter(isProbableAdjective);
    //     return probableAdjectives;
    // },
    // isProbable: function(ambAdj, j) {
    //     return ambAdj.bigrams[j].probability >= ambAdj.bigrams[j - 1].probability || ambAdj.bigrams[j - 1].probability === undefined;
    //     // function to return the most probably bigram tag is JJ
    // }
}