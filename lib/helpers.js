const bigramProbabilities = require("./bigramProbabilities");

function getArayOfWords(text) {
  return text
    .toString()
    .replace(/[!?.]/g, "[interpunction]")
    .replace(/[^a-zA-Z\d\s:]/g, "")
    .split(" ");
}

function wordTagsContainAdjective(tags) {
  return tags.includes("JJ") || tags.includes("JJR") || tags.includes("JJS");
}

function onlyWordTagIsAdjective(tags) {
  return tags.length < 1;
}

function isPrecedingElementAWord(precedingWordTags) {
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

module.exports = {
  getArayOfWords,
  wordTagsContainAdjective,
  onlyWordTagIsAdjective,
  isPrecedingElementAWord,
  convertTag,
  getTagProbability,
};
