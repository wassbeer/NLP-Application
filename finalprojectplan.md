
# NLP-Adjective Application

## 1. Write the algorithm

"An algorithm is an instruction set for completing some task deﬁned by some set of input/output" 

### Intro

The Adjective Finder algorithm searches for adjectives by comparing the words in the input to the Part-Of-Speech(POS) Lexicon as compilated by Eric Brill in 1993. The lexicon is an extensive word list with POS word type tags:

 "American": [
        "NNP", 
        "JJ", 
        "NN", 
        "RB"
    ], 
 "corporate": [
        "JJ"
    ]

Words can be divided in single tagged and multiple tagged instances.The word corporate possesses a single word type called JJ, the POS abbreviation for adjective. American can be a proper noun(NNP), adjective(JJ) a noun(NN) and an adverb(RB)!

The algorithm addresses the type ambiguity by applying so called _transition probabilities_. 
Transition probabilities represent the likelihood that word type A is succeeded by word type B. The probabilities are derived from a POS Hidden Markov Model (HMM) published by Princeton University based on analysis of the Wall Street Journal corpus. 

### Tag specification

CC Coord Conjuncn           and,but,or
CD Cardinal number          one,two
DT Determiner               the,some
EX Existential there        there
FW Foreign Word             mon dieu
IN Preposition              of,in,by
JJ Adjective                big
JJR Adj., comparative       bigger
JJS Adj., superlative       biggest
LS List item marker         1,One
MD Modal                    can,should
NN Noun, sing. or mass      dog
NNP Proper noun, sing.      Edinburgh
NNPS Proper noun, plural    Smiths
NNS Noun, plural            dogs
POS Possessive ending       Õs
PDT Predeterminer           all, both
PP$ Possessive pronoun      my,oneÕs
PRP Personal pronoun         I,you,she
RB Adverb                   quickly
RBR Adverb, comparative     faster
RBS Adverb, superlative     fastest
RP Particle                 up,off
SYM Symbol                  +,%,&
TO ÒtoÓ                     to
UH Interjection             oh, oops
VB verb, base form          eat
VBD verb, past tense        ate
VBG verb, gerund            eating
VBN verb, past part         eaten
VBP Verb, present           eat
VBZ Verb, present           eats
WDT Wh-determiner           which,that
WP Wh pronoun               who,what
WP$ Possessive-Wh           whose
WRB Wh-adverb               how,where

### The algorithm

_Prototypes_

0.0 A trueAdjective prototype is declared with this.properties word, tags, position and frequency.
0.1 A potentialAdjective prototype is declared that will be used to create objects in the algorithm with this.properties word, tags, bigrams, position and frequency.
0.2 A bigramObject prototype is declared that will be used to store bigram's this.tagseq and this.probability in a bigrams array in the potentialAdjective.bigram instance

_Lexicon_

0.3 Add the word "interpunctie" with tag "XX"
0.4 The word "undefined" will be tagged "XX"

_Bigram Probabilities_

0.5 A bigramprobabilities object stores probabilities as values of the properties named according to the tag sequence. For instance: "NN_JJ"

Input: a piece of literature

_Converting input to array of words_

1.1.1 Turn the input into array inputArray wherein words are list items. Words are divided by space, hyphens and punctuation that is followed by a space, or the end of line. 
1.1.2 Punctuation is defined as any non-letter or non-number and is stored as "interpunctie".
1.1.3 's, n't, 'd, 've, 'm, 'll, 're are divided as separate words when followed by a space or end of line.

_Find Potential Adjectives_

1.2.1 Iterate through the inputArray and search the words in the POS-lexicon.js file. 

_Find True Adjectives_

1.2.2 The words in inputArray that match with a word in the lexicon file that is only tagged as JJ(adjective) are stored in instances of the potentialAdjective prototype providing values for properties word, position and frequency. These objects are added to the array certainAdjective.

_Find Ambiguous Adjectives_

1.2.3 The words in inputArray that match with a word in the lexicon file that is tagged JJ but has more tags are stored in instances of the potentialAdjective prototype with properties word, tags, bigram and position having assigned a value.

1.2.4 The words before and after the ambiguous adjective are evaluated. The bigrams resulting from this are compared to the properties in the Lexicon.js file. If the property matches, an instance of the bigramObject prototype is created and added to the potentialAdjective.bigrams array storing the bigram and its probability.

1.2.5 The objects are added to the array ambiguousAdjective.

_The Ambiguous Adjectives Verdict_

1.3 The object in ambiguousAdjective contains the bigram probabilities having to be assessed. If the object's winning bigram's central value is a JJ, the object contains most likely a JJ. The object is pushed to to the certainAdjectives array. 

Output: an array with objects containing the inputs' adjectives

### Criteria for good algorithms

Speed: How fast are they? Is there a more efﬁcient solution? Wholeness: do they solve for every edge case? Scalability (big O notation): how fast is an algorithm in relation to the size of the input it receives? T(n) = O(n^2)

## 2. Program the algorithm
## 3. Render the result in D3.js

Source list:
* http://cs.nyu.edu/courses/spring12/CSCI-GA.2590-001/lecture4.pdf 
* https://en.wikipedia.org/wiki/Part-of-speech_tagging
* https://en.wikipedia.org/wiki/Brill_tagger 
* https://web.stanford.edu/~jurafsky/slp3/10.pdf
* https://en.wikipedia.org/wiki/Buffalo_buffalo_Buffalo_buffalo_buffalo_buffalo_Buffalo_buffalo 