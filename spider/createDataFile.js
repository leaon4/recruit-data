const db = require('./work_module/db');
const file = require('./work_module/file');

const tableName = 'aa';

run().catch(e => {
    console.error(e);
});

async function run() {
    let sql = `
        select * from ${tableName}
        order by salary_max,salary_min;
    `;
    let results = await db.query(sql);
    let zhilianData = {
        name: '成都前端薪资分布图',
        dataTime: '2018-12-01',
        datas: results
    };
    await file.writeFile('dist/zhilianData.js', 'const zhilianData=' + JSON.stringify(zhilianData));
    console.log('done!');
    process.exit();
}