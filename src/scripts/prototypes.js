module.exports = {
	certainAdjective: function(word, tags, position, frequency) {
		this.word = word;
		this.frequency = frequency;
	},
	potentialAdjective: function(word, tags, bigrams, position, frequency) {
		this.word = word;
		this.tags = tags;
		this.bigrams = bigrams;
		this.frequency = frequency;
	},
	bigramObject: function(tagseq, probability) {
		this.tagseq = tagseq;
		this.probability = probability;
	},
	csvAdjective: function(word, frequency) {
		this.word = word;
		this.frequency = frequency;
	}
}