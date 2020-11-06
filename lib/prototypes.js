function certainAdjective(word, tags, position) {
  this.word = word;
  this.tags = tags;
  this.position = position;
  this.frequency = 1;
  this.certain = true;
}

function ambiguousAdjective(word, tags, tagSequencesData, position) {
  this.word = word;
  this.tags = tags;
  this.tagSequencesData = tagSequencesData;
  this.position = position;
  this.frequency = 1;
  this.certain = false;
}

/*
	ambiguousAdjective {
	word: 'flare.unsure.great',
	tags: [ 'JJ', 'RB' ],
	tagSequencesData:
	[ tagSequenceDataObject { tagseq: [Object], probability: 0.011000000000000001 },
		tagSequenceDataObject { tagseq: [Object], probability: 0.003177777777777778 } ],
	position: 2789,
	frequency: 1 }
	*/

function tagSequenceDataObject(tagseq, probability) {
  this.tagseq = tagseq;
  this.probability = probability;
}

/*
[   tagSequenceDataObject {
	tagseq: [ 'DT', 'NNP', 'XX' ],
	probability: 0.00010384362139917695 },
		tagSequenceDataObject {
	tagseq: [ 'DT', 'JJ', 'XX' ],
	probability: 0.0000024109129705837526 },
		tagSequenceDataObject {
	tagseq: [ 'DT', 'NN', 'XX' ],
	probability: 2.1820756103583357e-8 } ]
*/

function csvAdjective(word, frequency) {
  this.word = word;
  this.frequency = frequency;
}

module.exports = {
  certainAdjective,
  ambiguousAdjective,
  tagSequenceDataObject,
  csvAdjective,
};
