const fs = require('fs');

class jsonToSql {
	constructor(file,table){
		this.file = file;
		this.sqlConverter = (data) => {
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
	}

	generate(){
		fs.readFile(this.file, 'utf8', (err, obj) => {
		  obj = JSON.parse(obj);
		  for(let key in obj){
		  	//check if value is an array then convert to sql
		  	if(Array.isArray(obj[key])) this.sqlConverter(obj[key]);
		  }
		})		
	}
}

newSql = new jsonToSql('./' + process.argv[2],process.argv[3]);
newSql.generate();

