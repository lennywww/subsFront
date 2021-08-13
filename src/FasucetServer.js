var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function faucet(request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    
    response.end(util.inspect(url.parse(req.url, true)));
    // 发送响应数据 "Hello World"
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');