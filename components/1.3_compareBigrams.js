// 1.3.1 Filter Ambiguous: does the most probable bigram contain an adjective?

function mostProbableBigram( ambiguousAdjective, certainAdjective ) {
	for ( let y = 0; y < ambiguousAdjective.length; y++ ) {
		let bigrams = ambiguousAdjective[ y ].bigrams;
		for ( let k = 1; k < bigrams.length; k++ ) {
			for ( let j = 1; j < bigrams.length; j++ ) {
				if ( bigrams[ j ].probability >= bigrams[ j - 1 ].probability || bigrams[ j - 1 ].probability === undefined ) {
					bigrams.splice( j - 1, 1 );
				}
			}
		}
	}
	assessWinningBigram( ambiguousAdjective, certainAdjective )
}

// 1.3.2 Filter Ambiguous: does the most probable bigram contain an adjective?

function assessWinningBigram( ambiguousAdjective, certainAdjective ) {
	for ( let y = 0; y < ambiguousAdjective.length; y++ ) {
		let winningBigram = ambiguousAdjective[ y ].bigrams[ 0 ].tagseq;
		if ( winningBigram[ 1 ] === "JJ" ) {
			certainAdjective.push( ambiguousAdjective[ y ].word )
		}
	}
	console.log( certainAdjective )
}