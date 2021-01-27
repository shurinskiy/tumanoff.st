//   - в терминале, из корневой папки проекта, выполнить node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const mkdirp = require('mkdirp2');

let blockName = process.argv[2];
let defaultExtensions = ['scss'];// расширения по умолчанию
let extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));


if(blockName) {
	let dirPath = './src/blocks/' + blockName + '/';

	mkdirp.promise(dirPath).then(() => {
		extensions.forEach(function(extention){

			let filePath = dirPath + blockName + '.' + extention;
			let fileContent = '';

			if(extention == 'scss') {
				styleFileImport = '@import \"../blocks/' + blockName + '/' + blockName + '.scss\";';
				fileContent = '// ' + styleFileImport + '\n.' + blockName + ' {\n  \n}\n';
			}

			else if(extention == 'js') {
				fileContent = '// (function(){\n// код\n// }());\n';
			}

			// Создаем файл, если он еще не существует
			if(fileExist(filePath) === false) {
				fs.writeFile(filePath, fileContent, (err) => {
					if (err) throw err;
					console.log('Файл создан: ' + filePath);
				});
			}
		});
	})
	.catch(err => console.error('Failed: ${err.message}'));
}

function uniqueArray(arr) {
	var objectTemp = {};
	for (var i = 0; i < arr.length; i++) {
		var str = arr[i];
		objectTemp[str] = true;
	}
	return Object.keys(objectTemp);
}

function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch(err) {
		return !(err && err.code === 'ENOENT');
	}
}
