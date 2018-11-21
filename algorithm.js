const fs = require( "fs" ),
	prototype = require( "./libs/prototypes" ),
	lexicon = require( "./libs/lexicon" ),
	bigramProbabilities = require( "./libs/bigramProbabilities" ),
	stringify = require( "csv-stringify" );

function returnAdjective( input ) {
	fs.readFile( input, ( err, data ) => {
		if (err) { throw err; }
		let arrayOfTextWords = data.toString()
			.replace( /[!?.]/g, "[interpunction]" )
			.replace( /[^a-zA-Z\d\s:]/g, "" )
			.split( " " );
		findPotentialAdjectives( arrayOfTextWords );
		/*
			[ '﻿My',
		  'fellow',
		  'citizens',
		  'I',
		  'stand',
		  'here',
		  'today',
		  'humbled',
		  'by',
		  'the',
		  'task',
		  'before',
		  'us',
		  'grateful',
		  'for',
		  'the',
		  'trust',
		  'you',
		  'have',
		  'bestowed',
		  'mindful',
		  'of',
		  'the',
		  'sacrifices',
		  'borne',
		  'by',
		  'our',
		  'ancestors',
		  'interpunctie',
		  ...]
			*/
	} )
}

// 1.2 find potential adjectives

function findPotentialAdjectives( inputArray ) {
	let certainAdjective = [],
		ambiguousAdjective = [];
	for ( let i = 0; i < inputArray.length + 2; i++ ) {
		let word = inputArray[ i - 1 ],
			tags = lexicon.lexicon[ inputArray[ i - 1 ] ],
			before = lexicon.lexicon[ inputArray[ i - 2 ] ],
			after = lexicon.lexicon[ inputArray[ i ] ],
			position = i - 1,
			frequency = 1;
		if ( tags && before ) {
			if ( tags.indexOf( "JJ" ) > -1 || tags.indexOf( "JJR" ) > -1 || tags.indexOf( "JJS" ) > -1 ) { // if JJ tag found
				if ( tags.length > 1 ) { // If the JJ tag is not the only tag
					if ( before[ 0 ] !== "XX" && before[ 0 ] !== undefined ) {
						let bigrams = [],
							tagProbability = 0.66;
						for ( let j = 0; j < tags.length; j++ ) { // storing the potential bigrams in an array
							if ( before[ 0 ].indexOf( "DT" ) > -1 ) { before[ 0 ] = "DT" }
							if ( before[ 0 ].indexOf( "JJ" ) > -1 ) { before[ 0 ] = "JJ" }
							if ( before[ 0 ].indexOf( "NNP" ) > -1 ) { before[ 0 ] = "NNP" }
							if ( before[ 0 ].indexOf( "PRP" ) > -1 ) { before[ 0 ] = "NNP" }
							if ( before[ 0 ].indexOf( "RB" ) > -1 ) { before[ 0 ] = "RB" }
							if ( before[ 0 ].indexOf( "VB" ) > -1 ) { before[ 0 ] = "VB" }
							if ( tags[ j ].indexOf( "DT" ) > -1 ) { tags[ j ] = "DT" }
							if ( tags[ j ].indexOf( "JJ" ) > -1 ) { tags[ j ] = "JJ" }
							if ( tags[ j ].indexOf( "NNP" ) > -1 ) { tags[ j ] = "NNP" }
							if ( tags[ j ].indexOf( "PRP" ) > -1 ) { tags[ j ] = "NNP" }
							if ( tags[ j ].indexOf( "RB" ) > -1 ) { tags[ j ] = "RB" }
							if ( tags[ j ].indexOf( "VB" ) > -1 ) { tags[ j ] = "VB" }
							let lexiconBigram = before[ 0 ] + "_" + tags[ j ];
							tagProbability = tagProbability / ( Math.pow( 3, j + 1 ) );
							let probability = bigramProbabilities.bigramProbabilities[ lexiconBigram ] * tagProbability,
								bigram = [];
							bigram.push( before[ 0 ], tags[ j ], "XX" ) // "XX" Signifying the ambiguous adjective position
							bigramObj = new prototype.bigramObject( bigram, probability );
							bigrams.push( bigramObj );
							/*
							[   bigramObject {
							    tagseq: [ 'DT', 'NNP', 'XX' ],
							    probability: 0.00010384362139917695 },
							  	bigramObject {
							    tagseq: [ 'DT', 'JJ', 'XX' ],
							    probability: 0.0000024109129705837526 },
							  	bigramObject {
							    tagseq: [ 'DT', 'NN', 'XX' ],
							    probability: 2.1820756103583357e-8 } ]
							*/
						}
						ambiguous = new prototype.potentialAdjective( `flare.unsure.${inputArray[i-1]}`, tags, bigrams, position, frequency );
						ambiguousAdjective.push( ambiguous );
						/*
							potentialAdjective {
						  word: 'flare.unsure.great',
						  tags: [ 'JJ', 'RB' ],
						  bigrams:
						   [ bigramObject { tagseq: [Object], probability: 0.011000000000000001 },
						     bigramObject { tagseq: [Object], probability: 0.003177777777777778 } ],
						  position: 2789,
						  frequency: 1 }
						  */
					} else {
						if ( after ) {
							let bigrams = [],
								tagProbability = 0.66;
							for ( let j = 0; j < tags.length; j++ ) { // storing the potential bigrams in an array
								if ( after[ 0 ].indexOf( "DT" ) > -1 ) { after[ 0 ] = "DT" }
								if ( after[ 0 ].indexOf( "JJ" ) > -1 ) { after[ 0 ] = "JJ" }
								if ( after[ 0 ].indexOf( "NNP" ) > -1 ) { after[ 0 ] = "NNP" }
								if ( after[ 0 ].indexOf( "PRP" ) > -1 ) { after[ 0 ] = "NNP" }
								if ( after[ 0 ].indexOf( "RB" ) > -1 ) { after[ 0 ] = "RB" }
								if ( after[ 0 ].indexOf( "VB" ) > -1 ) { after[ 0 ] = "VB" }
								if ( tags[ j ].indexOf( "DT" ) > -1 ) { tags[ j ] = "DT" }
								if ( tags[ j ].indexOf( "JJ" ) > -1 ) { tags[ j ] = "JJ" }
								if ( tags[ j ].indexOf( "NNP" ) > -1 ) { tags[ j ] = "NNP" }
								if ( tags[ j ].indexOf( "PRP" ) > -1 ) { tags[ j ] = "NNP" }
								if ( tags[ j ].indexOf( "VB" ) > -1 ) { tags[ j ] = "VB" }
								if ( tags[ j ].indexOf( "RB" ) > -1 ) { tags[ j ] = "RB" }
								let lexiconBigram = tags[ j ] + "_" + after[ 0 ];
								tagProbability = tagProbability / ( Math.pow( 3, j + 1 ) )
								let probability = bigramProbabilities.bigramProbabilities[ lexiconBigram ] * tagProbability,
									bigram = [];
								bigram.push( "XX", tags[ j ], after[ 0 ] ); // "XX" Signifying the ambiguous adjective position
								bigramObj = new prototype.bigramObject( bigram, probability );
								bigrams.push( bigramObj );
							}
							ambiguous = new prototype.potentialAdjective( `flare.unsure.${inputArray[i-1]}`, tags, bigrams, position, frequency );
							ambiguousAdjective.push( ambiguous );
						}
					}
				} else { // if JJ is the only tag
					certain = new prototype.trueAdjective( `flare.sure.${inputArray[i-1]}`, tags, position, frequency );
					certainAdjective.push( certain );
				}
			}
		}
	}
	distinguishCertainAdjective( ambiguousAdjective, certainAdjective );
}

// 1.3 Determine certain adjectives

function distinguishCertainAdjective( ambiguousAdjective, certainAdjective ) {
	ambiguousAdjective.forEach((ambAdj) => {
		for ( let k = 1; k < ambAdj.bigrams.length; k++ ) {
			for ( let j = 1; j < ambAdj.bigrams.length; j++ ) { // Which bigram is most probable?
				if ( ambAdj.bigrams[ j ].probability >= ambAdj.bigrams[ j - 1 ].probability || ambAdj.bigrams[ j - 1 ].probability === undefined ) {
					ambAdj.bigrams.splice( j - 1, 1 );
				}
			}
		}
	});
	
	for ( let y = 0; y < ambiguousAdjective.length; y++ ) {
		let winningBigram = ambiguousAdjective[ y ].bigrams[ 0 ].tagseq;
		if ( winningBigram[ 1 ] === "JJ" ) {
			certainAdjective.push( ambiguousAdjective[ y ] );
		}
	}

	// 1.4 Process frequency 

	function sortAndSpliceDouble( array ) {
		array.sort( function( a, b ) { return ( a.word > b.word ) ? 1 : ( ( b.word > a.word ) ? -1 : 0 ); } );
		for ( let j = 1; j < 50; j++ ) {
			for ( let i = 1; i < array.length; i++ ) {
				if ( array[ i - 1 ].word === array[ i ].word ) {
					array[ i - 1 ].frequency = array[ i - 1 ].frequency + 2;
					array.splice( i, 1 )
				}
			}
		}
	}

	sortAndSpliceDouble( certainAdjective );

	// 1.5 To CSV

	let csvData = [];
	for ( let k = 0; k < certainAdjective.length; k++ ) {
		let word = certainAdjective[ k ].word,
			frequency = certainAdjective[ k ].frequency;
		csvData.push( new prototype.csvAdjective( word, frequency ) );
	}
	stringify( csvData, function( err, output ) {
		newCsv = "id,value" + "\n" + "flare," + "\n" + "flare.vis," + "\n" + output;
		fs.writeFile( "./public/flare1.csv", newCsv, ( err ) => {
			if ( err ) { throw err }
		} )
	} )
}

module.exports = returnAdjective;