const fs = require("fs");
const prototype = require("./prototypes");
const lexicon = require("./lexicon");
const util = require("util");

const {
  getArayOfWords,
  wordTagsContainAdjective,
  onlyWordTagIsAdjective,
  isPrecedingElementAWord,
  convertTag,
  getTagProbability,
} = require("./helpers");

async function getAdjectives(input) {
  const readFile = util.promisify(fs.readFile);

  const inputText = await readFile(input);
  const arrayOfTextWords = getArayOfWords(inputText);
  const potentialAdjectives = getPotentialAdjectives(arrayOfTextWords);
  const certainAdjectives = getCertainAdjectives(potentialAdjectives);

  return certainAdjectives;
}

function getPotentialAdjectives(inputArray) {
  const certainAdjectives = [];
  const ambiguousAdjectives = [];

  for (let i = 0; i < inputArray.length + 2; i++) {
    const middleWordIndex = i - 1;
    const middleWordTags = lexicon.lexicon[inputArray[middleWordIndex]];
    const precedingWordTags = lexicon.lexicon[inputArray[i - 2]];
    const followingWordTags = lexicon.lexicon[inputArray[i]];

    if (!middleWordTags || !wordTagsContainAdjective(middleWordTags)) {
      continue;
    }

    if (onlyWordTagIsAdjective(middleWordTags)) {
      certainAdjectives.push(
        createCertainAdjective(middleWordIndex, middleWordTags)
      );
      continue;
    }

    if (precedingWordTags && isPrecedingElementAWord(precedingWordTags)) {
      const ambiguousAdjective = createAmbiguousAdjective(
        inputArray,
        precedingWordTags[0],
        middleWordTags,
        middleWordIndex,
        true
      );

      ambiguousAdjectives.push(ambiguousAdjective);
      continue;
    }

    if (followingWordTags) {
      const ambiguousAdjective = createAmbiguousAdjective(
        inputArray,
        followingWordTags[0],
        middleWordTags,
        middleWordIndex,
        false
      );

      ambiguousAdjectives.push(ambiguousAdjective);
    }
  }

  return { ambiguousAdjectives, certainAdjectives };
}

function createCertainAdjective(middleWordIndex, middleWordTags) {
  const csvCline = `flare.sure.${inputArray[middleWordIndex]}`;
  const certainAdjective = new prototype.certainAdjective(
    csvCline,
    middleWordTags,
    middleWordIndex
  );

  return certainAdjective;
}

function createAmbiguousAdjective(
  inputArray,
  otherWordTags,
  middleWordTags,
  middleWordIndex,
  isPreceding
) {
  const otherWordTag = convertTag(otherWordTags);
  const bigrams = getBigrams(middleWordTags, otherWordTag, isPreceding);

  const ambiguousAdjective = new prototype.ambiguousAdjective(
    `flare.unsure.${inputArray[middleWordIndex]}`,
    middleWordTags,
    bigrams,
    middleWordIndex
  );

  return ambiguousAdjective;
}

function getBigrams(middleWordTags, otherWordTag, isPreceding) {
  const bigrams = [];

  middleWordTags.forEach((tag, index) => {
    const convertedMiddleWordTag = convertTag(tag);
    const lexiconBigram = isPreceding
      ? otherWordTag + "_" + convertedMiddleWordTag
      : convertedMiddleWordTag + "_" + otherWordTag;
    const tagProbability = getTagProbability(index, lexiconBigram);

    const bigram = isPreceding
      ? [otherWordTag, convertedMiddleWordTag, "XX"]
      : ["XX", convertedMiddleWordTag, otherWordTag];

    const bigramObj = new prototype.bigramObject(bigram, tagProbability);
    bigrams.push(bigramObj);
  });

  return bigrams;
}

function getCertainAdjectives(potentialAdjectives) {
  const ambAdjs = potentialAdjectives.ambiguousAdjectives;
  const cerAdjs = potentialAdjectives.certainAdjectives;
  const cerAdjsWithMostProbableBigram = getAdjsWithMostProbableBigram(ambAdjs);

  for (let y = 0; y < cerAdjsWithMostProbableBigram.length; y++) {
    let winningBigram = cerAdjsWithMostProbableBigram[y].bigrams[0].tagseq;
    if (winningBigram[1] === "JJ") {
      cerAdjs.push(cerAdjsWithMostProbableBigram[y]);
    }
  }

  return sortAndSpliceDouble(cerAdjs);
}

function getAdjsWithMostProbableBigram(ambAdjs) {
  ambAdjs.forEach((ambAdj) => {
    for (let k = 1; k < ambAdj.bigrams.length; k++) {
      for (let j = 1; j < ambAdj.bigrams.length; j++) {
        // Which bigram is most probable?
        if (
          ambAdj.bigrams[j].probability >= ambAdj.bigrams[j - 1].probability ||
          ambAdj.bigrams[j - 1].probability === undefined
        ) {
          ambAdj.bigrams.splice(j - 1, 1);
        }
      }
    }
  });

  return ambAdjs;
}

function sortAndSpliceDouble(array) {
  array.sort(function (a, b) {
    return a.csvLine > b.csvLine ? 1 : b.csvLine > a.csvLine ? -1 : 0;
  });

  return mergeSameAdjectives(array);
}

const mergeSameAdjectives = (cerAdjs) => {
  let i = cerAdjs.length;

  while (i--) {
    const nextElIndex = i - 1;

    if (nextElIndex < 0) break;

    if (cerAdjs[i].csvLine === cerAdjs[nextElIndex].csvLine) {
      cerAdjs[i].frequency += cerAdjs[nextElIndex].frequency + 1; // ramp up the contrast
      cerAdjs.splice(nextElIndex, 1);
      i--;
    }
  }

  return cerAdjs;
};

module.exports = getAdjectives;
