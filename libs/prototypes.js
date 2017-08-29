// 0.1 prototypes

function trueAdjective( word, tags, position, frequency ) {
	this.word = word;
	this.tags = tags;
	this.position = position;
	this.frequency = frequency;
}

function potentialAdjective( word, tags, bigrams, position, frequency ) {
	this.word = word;
	this.tags = tags;
	this.bigrams = bigrams;
	this.position = position;
	this.frequency = frequency;
}

function bigramObject( tagseq, probability ) {
	this.tagseq = tagseq;
	this.probability = probability;
}

module.exports = {
	trueAdjective: trueAdjective,
	potentialAdjective: potentialAdjective,
	bigramObject: bigramObject
}