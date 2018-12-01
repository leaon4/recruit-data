const mysql = require('mysql');// 引入mysql模块
const fs = require('fs');
const path = require('path');

// 导出方法
module.exports = {
    insert,
    select,
    query
};

// 获取数据库配置文件
let option = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dbOption.json')));

// 创建连接池
const pool = mysql.createPool(option);

/**
 * 封装一条插入多条数据的方法
 * @param {Array} arr |待写入数据
 * @param {String} tableName |数据表名
 * @return {Promise} |mysql执行结果
 */
async function insert(arr, tableName) {
    // values，这一整段都是拼接sql语句的方法
    let values = arr.map(item => {
        return JSON.stringify(item).replace(/^ ?\[/, '(').replace(/ ?\]$/, ')');
    });
    values = values.join(',');


    let sql = `
		INSERT INTO ${tableName}(name,size,url,position_url,working_exp,salary_min,salary_max,job_name,lat,lon,city,area,\`update\`)
		VALUES${values};
	`;
    return new Promise((resolve, reject) => {
        // 将sql语句传入
        pool.query(sql, (err, results, fields) => {
            if (err) reject(err);
            // 将mysql执行成功结果返回
            resolve(results);
        });
    });
}

/**
 * 简单封装一条不带其他子句的查询方法
 */
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

/**
 * 简单封装一条只接收完整sql语句的方法
 */
async function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}