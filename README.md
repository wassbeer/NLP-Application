#NLP Application

The Adjective Finder algorithm is a Natural Language Processing(NLP) application searching for adjectives by comparing the words in the input to the Part-Of-Speech(POS) Lexicon as compilated by Eric Brill in 1993. The lexicon is an extensive word list with POS word type tags:

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