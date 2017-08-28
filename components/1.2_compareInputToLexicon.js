// 1.2 compare input to lexicon


function findPotentialAdjectives( inputArray ) {
	let certainAdjective = [],
		ambiguousAdjective = [];
	for ( let i = 0; i < inputArray.length + 2; i++ ) {
		let word = inputArray[ i - 1 ],
			tags = lexicon[ inputArray[ i - 1 ] ],
			before = lexicon[ inputArray[ i - 2 ] ],
			after = lexicon[ inputArray[ i ] ],
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
							let probability = bigramProbabilities[ lexiconBigram ] * tagProbability,
								bigram = [];
							bigram.push( before[ 0 ], tags[ j ], "XX" ) // "XX" Signifying the ambiguous adjective position
							bigramObj = new bigramObject( bigram, probability );
							bigrams.push( bigramObj )
						}
						ambiguous = new potentialAdjective( `${inputArray[i-1]}`, tags, bigrams, position, frequency );
						ambiguousAdjective.push( ambiguous )
					} else {
						if ( after[ 0 ] !== "XX" && after[ 0 ] !== undefined ) {
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
								let probability = bigramProbabilities[ lexiconBigram ] * tagProbability,
									bigram = [];
								bigram.push( "XX", tags[ j ], after[ 0 ] ); // "XX" Signifying the ambiguous adjective position
								bigramObj = new bigramObject( bigram, probability );
								bigrams.push( bigramObj )
							}
							ambiguous = new potentialAdjective( `${inputArray[i-1]}`, tags, bigrams, position, frequency );
							ambiguousAdjective.push( ambiguous )
						}
					}
				} else { // if JJ is the only tag
					certain = new trueAdjective( `${inputArray[i-1]}`, tags, position, frequency );
					certainAdjective.push( `${inputArray[i-1]}` )
					// console.log("2. certainAdjective: " + certainAdjective)
				}
			}
		}
	}
	mostProbableBigram( ambiguousAdjective, certainAdjective )
}