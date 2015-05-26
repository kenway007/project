
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var urllib = require('url');
var port = '8006';
var qs = require("querystring");
//var api = require('./api');

var app = express();

// all environments
app.set('port',port );

app.use('/static',express.static(__dirname+'\/static'));




//首页
app.get('/', function (req,res){
    send_html('index.html',req,res);
});

app.post('/app', function (req,res){
    _app(req,res)
});

app.get('/app', function (req,res){
    _app(req,res)
});


function _app(req,res){
    var data_path = 'static/data'
    jsonReqData(req,function (params){
        var file = '';
        switch (params.act){
            case('login'): file = '/login.json';  break;
            case('attention'): file = '/attention.json';  break;
        }
        resJson(req,res,data_path+file)
    });
}



//处理提交数据,返回JSON对象
function jsonReqData(req,callback){
    var method = req.route.method,
        query,
        params = {}
    query = req.query
    if (method == 'get'){
        params = query;
        callback(params);
    }
    if (method == 'post'){
        _post();
    }
    
    
    function _post(){
        var postData = ""
        req.addListener("data", function (chunk) {
            postData += chunk;
        });
        req.addListener("end", function () {
            if (postData.indexOf('Content-Disposition: form-data;') != -1){
                var vals = postData.match(/name=".*"\r\n\r\n.*\r\n/g)
                vals.forEach(function (v){
                    var cur = v.replace(/name=|\r\n/g,'').split('"')
                    params[cur[1]] = cur[2];
                })
            }else{
                params = JSON.parse(postData);
            }
            _extend(params,query)
            callback(params);
        })
    }

    function _extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        if (typeof target !== 'object' && _type(target) !== 'function') {
            target = {};
        }

        if (length === i) {
            target = this;
            --i;
        }

        for (; i<length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && (_isPlainObject(copy) || (copyIsArray = _type(copy) === 'array'))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && _type(src) === 'array' ? src : [];
                        } else {
                            clone = src && _isPlainObject(src) ? src : {};
                        }

                        target[name] = _extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

    return params;
}







//返回页面文件
function send_html(tpl_name,req,res){
    res.writeHead(200, {'Content-Type': 'text/html',charset : "utf-8"});
    fs.readFile('static/'+tpl_name, function(err, contents) {
        res.write(contents);
        res.send();
    });
}

//返回JSON
function resJson(req,res,path){
    var data = JSON.parse(fs.readFileSync(path));
    var params = urllib.parse(req.url, true);
    //console.log(params.query)
    res.writeHead(200, {'Content-Type': 'text/html',charset : "utf-8"});
    if (params.query && params.query.callback) {
        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
        res.end(str);
        console.log(str)
    } else {
        res.end(JSON.stringify(data));//普通的json
    }
}





http.createServer(app).listen(port, function(){});



console.log('启动成功,端口为:'+app.get('port'))














//向服务器发送请求，依赖http模块
/*function sendSer(opt){
 *//*var superagent = require('superagent')
 superagent.get('http://www.pccn.com.cn/app.php?act=login').end(function (err, res) {
 console.log(11111,res);
 });*//*

 *//*var options = {};

 //最终请求地址
 options.path = 'http://www.pccn.com.cn/app.php?act=login';

 //这里代理到fiddler
 options.host = '127.0.0.1';
 options.port = 8006;

 var req =  http.request(options, function (data){
 console.log('开始',data);
 }).on('data',function (data){
 console.log('获取中',data);
 }).on('end',function (){
 console.log('获取完毕','end')
 });
 req.end();*//*




 var superagent = require('superagent');

 superagent
 .post('http://www.pccn.com.cn/app.php?act=login')
 .set('Content-Type', 'application/json')
 .send({ name: 'Manny', species: 'cat' })
 .end(function(res){
 console.log('res = ' + res)
 if (res.ok) {
 console.log('yay got ' + JSON.stringify(res.body));
 } else {
 console.log('Oh no! error ' + res.text);
 }
 });





 *//*var options = {
 host : 'http://127.0.0.1:8006/',
 port : opt.port || 80,
 path : 'http://www.pccn.com.cn/app.php?act=login',
 method : opt.type || 'POST',
 headers : {
 'Content-Type' : opt.ContentType || 'application/json; charset=UTF-8',
 'Content-Length' : Buffer.byteLength(JSON.stringify(opt.data), 'utf8')
 }
 };
 var req = http.request(options, function(res) {
 console.log(119999999)
 var resData = ''
 res.on('data', function(d) {
 console.log(11111)
 resData += d;
 });
 res.on('end',function (){
 opt.success(resData)
 })
 });
 req.end();*//*
 }*/

