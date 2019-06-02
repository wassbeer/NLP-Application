import * as algorithm from './scripts/main'
import * as express from 'express'

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(port, (res) => {
	console.log('App listening on port ' + port);
});

algorithm(process.argv[2]);