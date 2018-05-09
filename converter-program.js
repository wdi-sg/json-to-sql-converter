const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let arrayName = 'countries';
let input = process.argv[2] || './countries.json';
let output = process.argv[3] || './output.sql';
let dbTableName = process.argv[4] || 'countries';
let data = null;
let convertedData = null;

function readData(inputFileName) {
    return JSON.parse(fs.readFileSync(inputFileName, 'utf8'))
};

function writeData(outputFileName, dataToWrite) {
    try {
        fs.writeFileSync(outputFileName, dataToWrite);
        console.log(outputFileName + ' successfully written.');
    } catch (err) {
        console.error(err)
    };
};

function convertDataToSQL(inputData) {
    // inputData should be an array
    let results = inputData.map((item) => {
        let entries = Object.entries(item);
        let size = entries.length;
        let column_names = '(';
        let values = '(';
        for (let i = 0; i < size; i++) {
            column_names += entries[i][0] + (i == size - 1 ? ')' : ', ');
            entries[i][1] = entries[i][1].replace(/'/g, "''");
            values += '\'' + entries[i][1] + '\'' + (i == size - 1 ? ')' : ', ');
        };
        return `INSERT INTO ${dbTableName} ${column_names} VALUES ${values}`
    })
    return results.join('\n');
};

function next() {
    data = readData(input);
    convertedData = convertDataToSQL(data[arrayName]);
    writeData(output, convertedData);
};

// We should be using readline-sync here to avoid this callback hell, but I don't feel like npm installing it
function main() {
    rl.question('Name of array to process: ', (ans) => {
        arrayName = ans;
        if (process.argv[2] === undefined) {
            rl.question('Name of input file: ', (ans) => {
                input = './' + ans;
                if (process.argv[3] === undefined) {
                    rl.question('Name of output file: ', (ans) => {
                        output = './' + ans;
                        if (process.argv[4] === undefined) {
                            rl.question('Name of database table to insert into: ', (ans) => {
                                dbTableName = ans;
                                rl.close();
                                next();
                            });
                        } else {
                            rl.close();
                            next();
                        }
                    });
                } else if (process.argv[4] === undefined) {
                    rl.question('Name of database table to insert into: ', (ans) => {
                        dbTableName = ans;
                        rl.close();
                        next();
                    });
                };
            });
        } else if (process.argv[3] === undefined) {
            rl.question('Name of output file: ', (ans) => {
                output = './' + ans;
                if (process.argv[4] === undefined) {
                    rl.question('Name of database table to insert into: ', (ans) => {
                        dbTableName = ans;
                        rl.close();
                        next();
                    });
                } else {
                    rl.close();
                    next();
                }
            });
        } else if (process.argv[4] === undefined) {
            rl.question('Name of database table to insert into: ', (ans) => {
                dbTableName = ans;
                rl.close();
                next();
            });
        };
    });

    
    

};

main();