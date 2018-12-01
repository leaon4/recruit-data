const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

module.exports = {
    insert,
    select,
    query
};

let option = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dbOption.json')));
const pool = mysql.createPool(option);

async function insert(arr, tableName) {
    let values = arr.map(item => {
        return JSON.stringify(item).replace(/^ ?\[/, '(').replace(/ ?\]$/, ')');
    });
    values = values.join(',');
    let sql = `
		INSERT INTO ${tableName}(name,size,url,position_url,working_exp,salary_min,salary_max,job_name,lat,lon,city,area,\`update\`)
		VALUES${values};
	`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

async function select(column = '*', tableName) {
    let sql = `
		SELECT ${column} from ${tableName};
	`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

async function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}