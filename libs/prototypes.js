export function trueAdjective(word, tags, position, frequency) {
	this.word = word;
	this.tags = tags;
	this.position = position;
	this.frequency = frequency;
}

export function potentialAdjective(word, tags, bigrams, position, frequency) {
	this.word = word;
	this.tags = tags;
	this.bigrams = bigrams;
	this.frequency = frequency;
}

export function bigramObject(tagseq, probability) {
	this.tagseq = tagseq;
	this.probability = probability;
}

export function csvAdjective(word, frequency) {
	this.word = word;
	this.frequency = frequency;
}