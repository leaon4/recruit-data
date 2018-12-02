const db = require('./work_module/db');
const spider = require('./work_module/spider');
const file = require('./work_module/file');

const tableName = 'aa';// 数据库表名
let start = 400;// 爬取的url之start值

run().catch(e => {
    console.error(e);
});

async function run() {
    let data, json, dbResult;
    try {
        // 爬取数据
        data = await spider.fetch(start);

        json = JSON.parse(data);

        // 格式化数据
        let arr = format(json.data.results);

        // 写入数据库
        dbResult = await db.insert(arr, tableName);
    } catch (e) {
        // 如果出现错误，将错误写入文件
        console.error(e);
        await file.writeFile('error.txt', e.stack);
        let log = json.data.results;
        await file.writeFile('error.json', JSON.stringify(log));
        return;
    }
    // 成功后start自增100
    start += 100;
    // 控制台输出成功信息
    console.log(dbResult);
    // 输出start值，用于记录。如果出错则可根据此修改初始start值
    console.log(start);

    if (start <= json.data.numFound) {
        // 作为一枚有底线的爬虫，当然要设置一点间隔时间
        setTimeout(run, 1000);
    } else {
        // 爬取完毕
        console.log('done!');
        process.exit();
    }
}

function format(results) {
    return results.map(item => {
        // item.salary是'10K-15K'的格式
        let salarys = item.salary.split('-');
        return [
            item.company.name,
            item.company.size.name,
            item.company.url,
            item.positionURL,
            item.workingExp.name,
            parseFloat(salarys[0]),
            parseFloat(salarys[1]),
            item.jobName,
            item.geo.lat,
            item.geo.lon,
            item.city.items[0].name,
            item.city.items[1] ? item.city.items[1].name : '',
            item.updateDate
        ]
    });
}
/*{
    "company": {
        "url": "https://company.zhaopin.com/CZ299230180.htm",
        "name": "成都恩威大健康管理有限公司",
        "size": {
            "name": "1000-9999人"
        },
    },
    "positionURL": "https://jobs.zhaopin.com/CC299230184J00221974003.htm",
    "workingExp": {
        "name": "1-3年"
    },
    "salary": "4K-6K",
    "jobName": "web前端开发工程师",
    "geo": {
        "lat": "30.528291",
        "lon": "103.987321"
    },
    "city": {
        "items": [{
            "name": "成都"
        }, {
            "name": "高新区"
        }],
    },
    "updateDate": "2018-11-26 15:07:04",
}*/