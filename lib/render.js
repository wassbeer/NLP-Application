const stringify = require("csv-stringify");
const getAdjectives = require("./algorithm");
const { getCSVData } = require("./helpers");
const fs = require("fs");

exports.renderAdjectives = async function (input) {
  const adjectives = await getAdjectives(input);
  const csvData = getCSVData(adjectives);

  stringify(csvData, function (err, output) {
    if (err) throw err;
    const newCsv = "id,value" + "\n" + "flare," + "\n" + "flare.vis," + "\n" + output;

    fs.writeFile("./public/flare1.csv", newCsv, (err) => {
      if (err) throw err;
      console.log("Rendering adjectives");
    });
  });
};
