# proxyhttp

node 接口转发中间件（代理）

```bash
npm install -S -D
```

```js
var app = express()

// parse body for send post data
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 本地调用测试环境 api, 需要连接 vpn
app.use("/api", require("proxyhttp")({
    // 内网对应的公网IP(若不设置，默认外网服务)
    "ip": "112.64.124.86",
    // 内网服务地址
    "intranet": "http://192.168.4.224:3011",
    // 外网服务地址
    "extranet": "http://192.168.101.7:3011"
}))
```