const fs = require( "fs" ),
	prototype = require( "./libs/prototypes" ),
	lexicon = require( "./libs/lexicon" ),
	bigramProbabilities = require( "./libs/bigramProbabilities" );

// 1.0 Input: a TXT file

let input = process.argv[ 2 ];

// 1.1 input to inputArray

function returnAdjective( input ) {
	fs.readFile( input, ( err, data ) => {
		input = data.toString();
		let inputArray = input.replace( /[!?.]/g, " [interpunctie] " ), // punctuation replaced by "[interpunctie]"
		inputArrayOne = inputArray.replace( /\'s/g, " his" ).replace( /n\'t/g, " not" ),
		inputArrayTwo = inputArrayOne.replace(/[^a-zA-Z\d\s:]/g, ""), // Deleting all non-alphanumerical except spaces
		inputArrayThree = inputArrayTwo.split( " " ); // splitting at space
		findPotentialAdjectives( inputArrayThree );
	} )
}

// 1.2 find potential adjectives

function findPotentialAdjectives( inputArray ) {
	let certainAdjective = [],
		ambiguousAdjective = [];
	for ( let i = 0; i < inputArray.length + 2; i++ ) {
		if(inputArray[i-1]){
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
						}
						ambiguous = new prototype.potentialAdjective( `${inputArray[i-1]}`, tags, bigrams, position, frequency );
						ambiguousAdjective.push( ambiguous );
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
							ambiguous = new prototype.potentialAdjective( `${inputArray[i-1]}`, tags, bigrams, position, frequency );
							ambiguousAdjective.push( ambiguous );
						}
					}
				} else { // if JJ is the only tag
					certain = new prototype.trueAdjective( `${inputArray[i-1]}`, tags, position, frequency );
					certainAdjective.push( `${inputArray[i-1]}` );
				}
			}
		}
	}}
	distinguishCertainAdjective( ambiguousAdjective, certainAdjective );
}

// 1.3 Determine certain adjectives

function distinguishCertainAdjective( ambiguousAdjective, certainAdjective ) {
	for ( let y = 0; y < ambiguousAdjective.length; y++ ) {
		let bigrams = ambiguousAdjective[ y ].bigrams;
		for ( let k = 1; k < bigrams.length; k++ ) {
			for ( let j = 1; j < bigrams.length; j++ ) { // Which bigram is most probable?
				if ( bigrams[ j ].probability >= bigrams[ j - 1 ].probability || bigrams[ j - 1 ].probability === undefined ) {
					bigrams.splice( j - 1, 1 );
				}
			}
		}
	}
	for ( let y = 0; y < ambiguousAdjective.length; y++ ) { // Is the middle value of the Winning bigram a JJ?
		let winningBigram = ambiguousAdjective[ y ].bigrams[ 0 ].tagseq;
		if ( winningBigram[ 1 ] === "JJ" ) {
			certainAdjective.push( ambiguousAdjective[ y ].word );
		}
	}
	console.log(certainAdjective)
};

returnAdjective( input );