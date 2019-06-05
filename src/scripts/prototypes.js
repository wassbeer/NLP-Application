module.exports = {
	certainAdjective: (word, tags, position, frequency) => {
		this.word = word;
		this.frequency = frequency;
	},
	potentialAdjective: (word, tags, bigrams, position, frequency) => {
		this.word = word;
		this.tags = tags;
		this.bigrams = bigrams;
		this.frequency = frequency;
	},
	bigramObject: (tagseq, probability) => {
		this.tagseq = tagseq;
		this.probability = probability;
	},
	csvAdjective: (word, frequency) => {
		this.word = word;
		this.frequency = frequency;
	}
}