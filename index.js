request = require('request');
var config = require('./../../proxy_conf.json');

// 接口转发
function transfer(ip, req, res) {
    // 根据外网 ip 切换调用内网、外网环境api
    // 转发逻辑
    agent = req.get('User-Agent');
    options = {
        'url': config[(ip == config.ip ? 'intranet' : 'extranet')] + req.baseUrl + req.path,
        'method': req.method,
        'qs': req.query,
        'gzip': true,
        'headers': {
            'User-Agent': agent,
            'X-Forwarded-For': req.ip
        }
    }

    if (req.is('json')) {
        options.json = true;
        options.body = req.body;
    } else if (req.is('urlencoded')) {
        options.form = req.body
    }
    console.info(options.method, options.url)
    console.dir(options.method == 'GET' ? req.query : req.body)
    console.log('\n')

    request(options).pipe(res);
}

module.exports = function() {
    return function proxy(req, res) {
        if (config.ip) require('./getIp')(transfer, req, res)
        else transfer('', req, res)
    };
};