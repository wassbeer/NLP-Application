const stringify = require("csv-stringify");
const getAdjectives = require("./algorithm");
const { csvAdjective } = require("./prototypes");
const fs = require("fs");

exports.renderAdjectives = async function (input) {
  const adjectives = await getAdjectives(input);
  const csvData = [];

  adjectives.forEach((adjective) => {
    const csvLine = `flare.${adjective.certain ? "" : "un"}sure.${adjective.word}`;
    const frequency = adjective.frequency;

    csvData.push(new csvAdjective(csvLine, frequency));
  });

  stringify(csvData, function (err, output) {
    if (err) throw err;

    const newCsv =
      "id,value" + "\n" + "flare," + "\n" + "flare.vis," + "\n" + output;

    fs.writeFile("./public/flare1.csv", newCsv, (err) => {
      if (err) throw err;
      console.log("Rendering adjectives");
    });
  });
};
