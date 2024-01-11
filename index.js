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
    if(req.url === "/"){
        fs.readFile("./index.html", "utf8", function(err, data){
            if (err) throw err;
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }

})

server.timeout = 5000;//5秒响应时间
server.listen(8080);
