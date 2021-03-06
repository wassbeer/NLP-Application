# NLP Application

The Adjective Finder is a Node.js application utilizing a Natural Language Processing(NLP) algorithm to filter adjectives from input.

## Background

The NLP Application embodies the final project of the Web Development Bootcamp with JavaScript at the New York Code + Design Academy, Amsterdam.

## Table of Contents

- [The Algorithm](#The-algorithm)
- [API's and Libraries](#API-&-Libraries)
- [Usage](#Usage)

## The algorithm

The algorithm searches for adjectives by comparing the words in the input to the Part-Of-Speech(POS) Lexicon as compilated by Eric Brill in 1993, and consequently applying transition probabilities to address word tag ambiguity. 

The Brill Tagger lexicon is an extensive word list with POS word tags:

 _"American": [ "NNP", "JJ", "NN", "RB" ]_

 _"corporate": [ "JJ" ]_

Words can be divided in single tagged and multiple tagged instances.The word "corporate" possesses a single tag: adjective (JJ). "American" can be a proper noun(NNP), adjective(JJ) a noun(NN) and an adverb(RB)!

The algorithm addresses tag ambiguity by applying so called _transition probabilities_. Transition probabilities represent the likelihood that word type A is succeeded by word type B. The probabilities are derived from a POS Hidden Markov Model (HMM) published by Princeton University based on analysis of the Wall Street Journal corpus. 

## API & Libraries

- D3.js library for data visualization
- NPM CSV module for CSV stringify

## Usage

* Download master branch
* NPM install
* Hack away

![banner](https://github.com/wassbeer/NLP-Application/blob/master/public/images/screenshot.JPG?raw=true)

> Visualization of filtered Adjectives using the D3.js library. The core bubbles represent the unambiguous adjectives, the peripheral adjectives are ambiguous and went through HMM evaluation.