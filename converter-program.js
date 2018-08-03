var fs = require('fs');
var JSONfile = process.argv[2];
var tableName = process.argv[3];

var data = fs.readFileSync(JSONfile, 'utf8');
var JSONdata = JSON.parse(data);


var SQLcommands = [];
let array = JSONdata[tableName];

for(let i=0; i<array.length; i++) {
    columns = Object.keys(array[i]);
    let col = '"' + columns[0] + '"';
    let val = '"' + array[i][columns[0]] + '"';
    for(let c=1; c<columns.length; c++) {
        col += ', "' + columns[c] + '"';
        val += ', "' + array[i][columns[c]] + '"';
    }
    SQLcommands.push('INSERT INTO ' + tableName + '(' + col + ')' + 'VALUES (' + val + ')');
}

for(let i=0; i<SQLcommands.length; i++) {
    fs.appendFile('output.sql', SQLcommands[i], function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}