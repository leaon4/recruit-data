const fs = require('fs');

module.exports={
	readFile,
	writeFile
};

async function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, file) => {
            if (err) reject(err);
            resolve(file);
        });
    });
}

async function writeFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) reject(err);
            resolve();
        });
    });
}