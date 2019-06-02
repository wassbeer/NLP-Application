import data from './data';
import adjective from './adjective';

export function returnAdjectives(text) {
	const textArray = data.toTextArray(text);
	const certainJJs = textArray
		.filter(adjective.isCertain)
		.map(data.toCertainAdjectiveObj);

	return certainJJs;
	
	// const probableJJs = textArray
	// 	.filter(adjective.isPotential)
	// 	.filter(adjective.isProbable);
	// const certainAndProbableAdjectives = data.toUnique(certainJJs.concat(probableJJs));

	// return certainAndProbableAdjectives;
	// format.toCSV()
}
