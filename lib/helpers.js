const prototype = require("./prototypes");
const lexicon = require("./lexicon");
const bigramProbabilities = require("./bigramProbabilities");

function wordTagsContainAdjective(tags) {
  return tags.includes("JJ") || tags.includes("JJR") || tags.includes("JJS");
}

function onlyHasAdjectiveTag(tags) {
  return tags.length === 1;
}

function getWordData(inputArray, index) {
  const middleWordIndex = index - 1;

  return {
    string: inputArray[middleWordIndex],
    index: middleWordIndex,
    tags: lexicon.lexicon[inputArray[middleWordIndex]],
    precedingWordTags: lexicon.lexicon[inputArray[index - 2]],
    followingWordTags: lexicon.lexicon[inputArray[index]]
  };
}

function addCertainAdjective(wordData, certainAdjectives) {
  const certainAdjective = new prototype.certainAdjective(
    wordData.string,
    wordData.tags,
    wordData.index
  );

  certainAdjectives.push(certainAdjective);
}

function addAmbiguousAdjective(wordData, ambiguousAdjectives) {
  const beforeAndMiddle = isPrecedingElementAWord(wordData.precedingWordTags);
  let tagSequencesData = [];

  if (beforeAndMiddle) tagSequencesData = getBeforeAndMiddleTagSequencesData(wordData);
  else if (wordData.followingWordTags) tagSequencesData = getMiddleAndAfterTagSequencesData(wordData);

  const ambiguousAdjective = new prototype.ambiguousAdjective(
    wordData.string,
    wordData.tags,
    tagSequencesData,
    wordData.index
  );

  ambiguousAdjectives.push(ambiguousAdjective);
}

function getBeforeAndMiddleTagSequencesData(wordData) {
  const beforeWordTag = convertTag(wordData.precedingWordTags[0]);
  const tagSequencesData = [];

  wordData.tags.forEach((tag, index) => {
    const convertedMiddleWordTag = convertTag(tag);
    const lexiconBigram = beforeWordTag + "_" + convertedMiddleWordTag;
    const tagProbability = getTagProbability(index, lexiconBigram);
    const tagSequence = [beforeWordTag, convertedMiddleWordTag, "XX"];

    const tagSequenceDataObj = new prototype.tagSequenceDataObject(tagSequence, tagProbability);

    tagSequencesData.push(tagSequenceDataObj);
  });

  return tagSequencesData;
}

function getMiddleAndAfterTagSequencesData(wordData) {
  const afterWordTag = convertTag(wordData.followingWordTags[0]);
  const tagSequencesData = [];

  wordData.tags.forEach((tag, index) => {
    const convertedMiddleWordTag = convertTag(tag);
    const lexiconBigram = convertedMiddleWordTag + "_" + afterWordTag;
    const tagProbability = getTagProbability(index, lexiconBigram);
    const tagSequence = ["XX", convertedMiddleWordTag, afterWordTag];

    const tagSequenceDataObj = new prototype.tagSequenceDataObject(tagSequence, tagProbability);

    tagSequencesData.push(tagSequenceDataObj);
  });

  return tagSequencesData;
}

function isPrecedingElementAWord(precedingWordTags=[]) {
  return precedingWordTags[0] !== "XX" && precedingWordTags[0] !== undefined;
}

function convertTag(tag) {
  if (tag.indexOf("DT") > -1) {
    tag = "DT";
  } else if (tag.indexOf("JJ") > -1) {
    tag = "JJ";
  } else if (tag.indexOf("NNP") > -1) {
    tag = "NNP";
  } else if (tag.indexOf("PRP") > -1) {
    tag = "NNP";
  } else if (tag.indexOf("RB") > -1) {
    tag = "RB";
  } else if (tag.indexOf("VB") > -1) {
    tag = "VB";
  }

  return tag;
}

function getTagProbability(index, lexiconBigram) {
  const probQuotient = 0.66 / Math.pow(3, index + 1);
  return bigramProbabilities.bigramProbabilities[lexiconBigram] * probQuotient;
}

function getAdjsWithMostProbableBigram(ambAdjs) {
  ambAdjs.forEach((ambAdj) => {
    for (let k = 1; k < ambAdj.tagSequencesData.length; k++) {
      for (let j = 1; j < ambAdj.tagSequencesData.length; j++) {
        // Which bigram is most probable?
        if (
          ambAdj.tagSequencesData[j].probability >= ambAdj.tagSequencesData[j - 1].probability ||
          ambAdj.tagSequencesData[j - 1].probability === undefined
        ) {
          ambAdj.tagSequencesData.splice(j - 1, 1);
        }
      }
    }
  });

  return ambAdjs;
}

function winningTagSeqHasAdjAtCenter(adjective) {
  const winningTagSeq = adjective.tagSequencesData[0].tagseq;
  return winningTagSeq[1] === "JJ";
}

function sortAndSpliceDouble(array) {
  array.sort(function (a, b) {
    return a.word > b.word ? 1 : b.word > a.word ? -1 : 0;
  });

  return mergeSameAdjectives(array);
}

const mergeSameAdjectives = (cerAdjs) => {
  let i = cerAdjs.length;

  while (i--) {
    const nextElIndex = i - 1;

    if (nextElIndex < 0) break;

    if (cerAdjs[i].word === cerAdjs[nextElIndex].word) {
      cerAdjs[i].frequency += cerAdjs[nextElIndex].frequency;
      cerAdjs.splice(nextElIndex, 1);
    }
  }

  return cerAdjs;
};

function getCSVData(adjectives) {
  const csvData = [];

  adjectives.forEach((adjective) => {
    const csvLine = `flare.${adjective.certain ? "" : "un"}sure.${adjective.word}`;
    const frequency = adjective.frequency;

    csvData.push(new prototype.csvAdjective(csvLine, frequency));
  });

  return csvData;
}

module.exports = {
  wordTagsContainAdjective,
  onlyHasAdjectiveTag,
  getWordData,
  addCertainAdjective,
  addAmbiguousAdjective,
  getAdjsWithMostProbableBigram,
  sortAndSpliceDouble,
  getCSVData,
  winningTagSeqHasAdjAtCenter
};
