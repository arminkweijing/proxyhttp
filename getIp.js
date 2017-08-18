// 抓取外网 ip
var http = require('http')
var cheerio = require('cheerio')
var cache = require('memory-cache')

module.exports = function(callback) {
    var ip = cache.get('ip')
    if (ip) {
        callback(ip)
    } else {
        // 搜狐免费 ip 开放接口：http://pv.sohu.com/cityjson
        http.get('http://pv.sohu.com/cityjson', function(res) {
            var body = ''
            res.on('data', function(data) {
                body += data
            })
            res.on('end', function() {
                eval(body)
                ip = returnCitySN.cip
                cache.put('ip', ip)
                console.log(`>> 外网ip：${cache.get('ip')}      API：${ip == '112.64.124.86' ? '内网/开发环境' : '外网/测试环境'}`)
            })
        }).on('error', function() {
            console.log('抓取 IP 出错')
        })
    }
}