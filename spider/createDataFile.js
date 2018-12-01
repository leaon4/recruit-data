const db = require('./work_module/db');
const file = require('./work_module/file');

// 这里写入数据表名
const tableName = 'compony';

run().catch(e => {
    console.error(e);
});

async function run() {
    let sql = `
        select * from ${tableName}
        order by salary_max,salary_min,working_exp;
    `;

    // 获取数据库数据
    let results = await db.query(sql);

    // 封装进一个全局变量
    let zhilianData = {
        name: '成都前端薪资分布图',// 图表的名称
        dataTime: '2018-12-01',// 图表的数据时间
        cityGeo: [104.07, 30.62],// 该城市的经纬度
        initZoom: 12,// 地图的初始缩放值
        datas: results
    };

    // 生成dist/zhilianData.js
    await file.writeFile('dist/zhilianData.js', 'const zhilianData=' + JSON.stringify(zhilianData));
    console.log('done!');
    process.exit();
}