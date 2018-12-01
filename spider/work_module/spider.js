const https = require('https');

module.exports = {
    fetch
};

const options = {
    hostname: 'fe-api.zhaopin.com',
    path: '',
    port: 443,
    method: 'GET',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        Host: 'fe-api.zhaopin.com',
        Origin: 'https://sou.zhaopin.com',
        Cookie: 'sts_deviceid=167559a12ee6d-0206f0b0dd604b-3f674604-1327104-167559a12f019f; jobRiskWarning=true; ZP_OLD_FLAG=false; LastCity=%E6%88%90%E9%83%BD; LastCity%5Fid=801; sts_sg=1; sts_sid=167559a16cb67e-006c5655e76b99-3f674604-1327104-167559a16cc524; sts_chnlsid=Unknown; zp_src_url=https%3A%2F%2Fwww.zhaopin.com%2F; GUID=373c679c84bf466dbe1cade6b1bf9be1; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22167559a1721a58-0c14d9b5792b16-3f674604-1327104-167559a172214a%22%2C%22%24device_id%22%3A%22167559a1721a58-0c14d9b5792b16-3f674604-1327104-167559a172214a%22%2C%22props%22%3A%7B%7D%7D; Hm_lvt_38ba284938d5eddca645bb5e02a02006=1543329421; Hm_lpvt_38ba284938d5eddca645bb5e02a02006=1543329421; ZL_REPORT_GLOBAL={%22sou%22:{%22actionid%22:%228920c23d-e10d-4039-beee-84a21fc14432-sou%22%2C%22funczone%22:%22smart_matching%22}}; sts_evtseq=7',
    }
};

/**
 * 根据start的值，将获取的数据返回
 */
async function fetch(start = 0) {
    setOptionPath(start);
    let data = await request(options);
    return data;
}

/**
 * 根据start动态修改options.path
 */
function setOptionPath(start){
    options.path=`/c/i/sou?start=${start}&pageSize=100&cityId=801&workExperience=-1&education=-1&companyType=-1&employmentType=-1&jobWelfareTag=-1&kw=%E5%89%8D%E7%AB%AF&kt=3&_v=0.94922515&x-zp-page-request-id=cfca3a09c69d457395df0ae072a48404-1543657761205-287220`;
}

/**
 * 将异步爬取请求封装成promise
 */
async function request(options) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let arr = [];
            res.on('data', chunk => {
                arr.push(chunk);
            });
            res.on('end', err => {
                if (err) reject(err);
                let data = Buffer.concat(arr).toString();
                resolve(data);
            });
        });
        // 多注册一个eeror事件
        req.on('error', e => {
            console.error(e);
            reject(e);
        });

        req.end();
    });
}