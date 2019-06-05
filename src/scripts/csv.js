import { csvAdjective } from './libs/prototypes';
import * as stringify from 'csv-stringify';

module.exports = {
    prepare: (certainAndProbableAdjectives) => {
        certainAndProbableAdjectives.map((e) => {
            return new csvAdjective(e.word, e.frequency);
        });
        return certainAndProbableAdjectives;
    },
	toCSV: (certainAndProbableAdjectives) => {
        const csvData = this.prepare(certainAndProbableAdjectives);
        stringify(csvData, (err, output) => {
            if (err) { throw err; }
            const newCsv = 'id,value' + '\n' + 'flare,' + '\n' + 'flare.vis,' + '\n' + output,
                csvLocation = './../public/flare1.csv';
            fs.writeFile(csvLocation, newCsv, (err) => {
                if (err) { throw err; }
            });
        });
    }
}