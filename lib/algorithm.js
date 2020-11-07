const fs = require("fs");
const util = require("util");

const {
  wordTagsContainAdjective,
  onlyHasAdjectiveTag,
  getWordData,
  addCertainAdjective,
  addAmbiguousAdjective,
  getAdjsWithMostProbableBigram,
  sortAndSpliceDouble
} = require("./helpers");

async function getAdjectives(input) {
  const readFile = util.promisify(fs.readFile);

  const inputText = await readFile(input);
  const arrayOfTextWords = getArayOfWords(inputText);
  const potentialAdjectives = getPotentialAdjectives(arrayOfTextWords);
  const certainAdjectives = determineAdjectives(potentialAdjectives);

  return certainAdjectives;
}

function getArayOfWords(text) {
  return text
    .toString()
    .replace(/[!?.]/g, "[interpunction]")
    .replace(/[^a-zA-Z\d\s:]/g, "")
    .split(" ");
}

function getPotentialAdjectives(inputArray) {
  const certainAdjectives = [];
  const ambiguousAdjectives = [];

  for (let i = 0; i < inputArray.length + 2; i++) {
    const wordData = getWordData(inputArray, i);

    if (!wordData.tags || !wordTagsContainAdjective(wordData.tags)) {
      continue;
    }

    if (onlyHasAdjectiveTag(wordData.tags)) {
      addCertainAdjective(wordData, certainAdjectives);
      continue;
    }

    if (wordData.precedingWordTags || wordData.followingWordTags) {
      addAmbiguousAdjective(wordData, ambiguousAdjectives);
    }
  }

  return { ambiguousAdjectives, certainAdjectives };
}

function determineAdjectives(potentialAdjectives) {
  const ambAdjs = potentialAdjectives.ambiguousAdjectives;
  const cerAdjs = potentialAdjectives.certainAdjectives;
  const cerAdjsWithMostProbableBigram = getAdjsWithMostProbableBigram(ambAdjs);

  for (let y = 0; y < cerAdjsWithMostProbableBigram.length; y++) {
    if (!cerAdjsWithMostProbableBigram[y].tagSequencesData[0]) continue;

    const winningBigram = cerAdjsWithMostProbableBigram[y].tagSequencesData[0].tagseq;
    if (winningBigram[1] === "JJ") {
      cerAdjs.push(cerAdjsWithMostProbableBigram[y]);
    }
  }

  return sortAndSpliceDouble(cerAdjs);
}

module.exports = getAdjectives;
