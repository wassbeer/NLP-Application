function certainAdjective(csvLine, tags, position) {
  this.csvLine = csvLine;
  this.tags = tags;
  this.position = position;
  this.frequency = 1;
}

function ambiguousAdjective(csvLine, tags, bigrams, position) {
  this.csvLine = csvLine;
  this.tags = tags;
  this.bigrams = bigrams;
  this.position = position;
  this.frequency = 1;
}

/*
	ambiguousAdjective {
	word: 'flare.unsure.great',
	tags: [ 'JJ', 'RB' ],
	bigrams:
	[ bigramObject { tagseq: [Object], probability: 0.011000000000000001 },
		bigramObject { tagseq: [Object], probability: 0.003177777777777778 } ],
	position: 2789,
	frequency: 1 }
	*/

function bigramObject(tagseq, probability) {
  this.tagseq = tagseq;
  this.probability = probability;
}

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

function csvAdjective(csvLine, frequency) {
  this.csvLine = csvLine;
  this.frequency = frequency;
}

module.exports = {
  certainAdjective,
  ambiguousAdjective,
  bigramObject,
  csvAdjective,
};