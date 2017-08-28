// 1.1 input to inputArray

function returnAdjective( input ) {
	let inputArray = input.replace( /[!?.]/g, " interpunctie " ); 	// punctuation replaced by "[interpunctie]"
	inputArray = inputArray.replace( /[,#@()%\^&*<>_%]"/g, "" ); 	// non Alphabetical and number characters are deleted
	inputArray = inputArray.replace( "\'s", " his" ).replace( "n\'t", " not" ).replace( "\'d", " would" ).replace( "\'ve", " have" ).replace( "\'ll", " will" ).replace( "\'re", " are" );	// separating abbreviated words
	inputArray = inputArray.split( " " ); 	// splitting at space
	return inputArray
}