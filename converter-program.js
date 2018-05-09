const fs = require('fs');
const file = './' + process.argv[2];
const table = process.argv[3]

const sqlConverter = (data) => {
	let output = '';
	Array.from(data).forEach((item) => {
		let keyStr = '';
		let valueStr = '';
		for(let key in item){
			keyStr += ',' + key;
			valueStr += ',' + '"' + item[key] + '"';
		}
		let string = 'INSERT INTO ' + table + '\n(' + keyStr.substring(1,keyStr.length) + ')' + '\nVALUES\n(' + valueStr.substring(1,valueStr.length) + ');\n'
		output += string + '\n'; 
	})
	fs.writeFileSync('./data.sql',output); 
}

fs.readFile(file, 'utf8', (err, obj) => {
  obj = JSON.parse(obj);
  for(let key in obj){
  	//check if value is an array then convert to sql
  	if(Array.isArray(obj[key])) sqlConverter(obj[key]);
  }
})

