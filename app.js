const { renderAdjectives } = require("./lib/render");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

if (!process.argv[2]) {
	console.log("Please submtit a text input as in: '<start_command> path/to/text_file'");
	return;
}

app.use(express.static(__dirname + "/public"));

app.listen( port, () => {
	console.log("App listening in port " + port);
});

renderAdjectives(process.argv[2]);
