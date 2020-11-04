const { renderAdjectives } = require("./lib/render");
const port = process.env.PORT || 5000;

if (!process.argv[2]) {
	console.log("Please submtit a text input as in: '<start_command> text_file'");
	return;
}

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.listen( port, ( res ) => {
	console.log("App listening in port " + port);
});


renderAdjectives(process.argv[2]);