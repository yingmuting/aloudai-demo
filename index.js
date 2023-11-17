const http = require("http"),//创建服务器需要http模块
      fs = require("fs"),    //fs模块用来读写html
      url = require("url");  //url模块用来解析输入的url

//创建服务器对象
let server = http.createServer();
//服务器监听时打印"listening"
server.on("listening", function () {
    console.log("listening");
})

//服务器接收到请求时
server.on("request", function (req, res) {
    //发送响应头请求（状态码，状态信息，响应头对象）
    res.writeHead(200, "OK", {
        'Content-Type': 'text/html'//将数据作为html对象进行编码
    });

    //读取html文件，并反馈到客户端
    fs.readFile('./index.html', 'utf8', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
})

server.timeout = 5000;//5秒响应时间
server.listen(8080, 'localhost');
