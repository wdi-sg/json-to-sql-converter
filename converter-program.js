var fs = require('fs');
const inputJson = require(process.argv[2]);
const tableName = process.argv[3];
const fileToSaveTo = process.argv[3] + ".sql"

function printToTerminal(input) {

      let returnResult = "";
      for (var name in input) {
            for (let i = 0; i < input[name].length; i++) {
                  returnResult = returnResult + "INSERT INTO " + name + "\n" + "("
                  for (var key in input[name][i]) {

                        returnResult = returnResult + key + ","
                  }
                  returnResult.slice(0, -1)
                  returnResult = returnResult + ")" + "\n" + "VALUES" + "\n" + "("
                  for (var key in input[name][i]) {

                        returnResult = returnResult + input[name][i][key] + ","
                  }
                  returnResult.slice(0, -1)

                  returnResult = returnResult + ")" + "\n"
            }
      }
      return returnResult;
}

console.log(printToTerminal(inputJson))



// fs.writeFile(fileToSaveTo, printToTerminal(inputJson), function(err) {
//       if (err) {
//             return console.log(err);
//       }

//       console.log("The file was saved!");
// });