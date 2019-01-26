exports function trueAdjective(word, tags, position, frequency) {
	this.word = word;
	this.tags = tags;
	this.position = position;
	this.frequency = frequency;
}

exports function potentialAdjective(word, tags, bigrams, position, frequency) {
	this.word = word;
	this.tags = tags;
	this.bigrams = bigrams;
	this.position = position;
	this.frequency = frequency;
}

exports function bigramObject(tagseq, probability) {
	this.tagseq = tagseq;
	this.probability = probability;
}

exports function csvAdjective(word, frequency) {
	this.word = word;
	this.frequency = frequency;
}