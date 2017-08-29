// 1.1 input to inputArray

function returnAdjective( input ) {
	fs.readFile(input, (err, data) => {
	input = data.toString();
	// punctuation replaced by "[interpunctie]"
	let inputArray = input.replace( /[!?.]/g, " [interpunctie] " );
	// non Alphabetical and number characters are deleted
	inputArray = inputArray.replace( /[,#@()%\^&*<>_%]"/g, "" )
	// separating abbreviated words
	inputArray = inputArray.replace( "\'s", " his" ).replace( "n\'t", " not" ).replace( "\'d", " would" ).replace( "\'ve", " have" ).replace( "\'ll", " will" ).replace( "\'re", " are" )
	// splitting at space
	inputArray = inputArray.split( " " );
	findPotentialAdjectives( inputArray )
	})
}