const jsonfile = require('jsonfile');
const fs = require('fs');
const jsonFileName = process.argv[2];
const dbName = process.argv[3];

jsonfile.readFile(jsonFileName, (err, obj) => {
  const rows = obj[dbName];
  let sqlStatement = '';
  rows.forEach((row) => {
    let colNames = '';
    let rowValues = '';
    for (let key in row) {
      colNames += key + ',';
      rowValues += `$$${row[key]}$$` + ',';
    }
    sqlStatement += `INSERT INTO ${dbName} (${colNames.slice(0, -1)}) VALUES (${rowValues.slice(0, -1)});\n`
  })

  fs.writeFile(dbName + ".sql", sqlStatement, (err2) => {
    if (err2) {
      return console.error(err2)
    }
  })
  return console.log("saved as " + dbName + ".sql");
});

