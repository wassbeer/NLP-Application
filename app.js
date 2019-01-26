const algorithm = require('./algorithm'),
	port = process.env.PORT || 5000;

const express = require('express'),
	app = express();
app.use(express.static(__dirname + '/public'));

app.listen( port, ( res ) => {
	console.log('App listening on port ' + port);
});

algorithm(process.argv[2]);