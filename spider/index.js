const db = require('./work_module/db');
const spider = require('./work_module/spider');
const file = require('./work_module/file');

const tableName = 'aa';
let index = 0;

run().catch(e => {
    console.error(e);
});

async function run() {
    let data, json, dbResult;
    try {
        data = await spider.fetch(index);
        json = JSON.parse(data);
        let arr = format(json.data.results);
        dbResult = await db.insert(arr, tableName);
    } catch (e) {
        console.error(e);
        await file.writeFile('error.txt', e.stack);
        let log = json.data.results;
        await file.writeFile('error.json', JSON.stringify(log));
        return;
    }
    index += 100;
    console.log(dbResult);
    console.log(index);
    if (index <= json.data.numFound) {
        setTimeout(run, 500);
    } else {
        console.log('done!');
    }
}

function format(results) {
    return results.map(item => {
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