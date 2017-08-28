// 0.1 prototypes

function potentialAdjective( word, tags, bigrams, probability, position, frequency ) {
	this.word = word;
	this.tags = tags;
	this.bigrams = bigrams;
	this.position = position;
	this.frequency = frequency;
}

function trueAdjective( word, tags, position, frequency ) {
	this.word = word;
	this.tags = tags;
	this.position = position;
	this.frequency = frequency;
}

function bigramObject( tagseq, probability ) {
	this.tagseq = tagseq;
	this.probability = probability;
}