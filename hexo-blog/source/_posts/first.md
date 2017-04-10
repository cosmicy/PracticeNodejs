---
title: nodejs实践
date: 2017-02-16 16:56:42
tags:
---



# nodejs实践

## 安装

### Win10
1. 下载node.exe
可以直接使用，但npm没有，不采用这个方式
2. 下载msi安装程序
但安装时出现问题，找不到dll
	nodejs a dll required

解决办法
	Nevertheless, after going to Properties > Security on the C:\Users\x\AppData\Local\Temp folder and giving that Everyone the Full control permission

修改temp目录权限，直接改无法成功，需要清空里面的临时文件

### Pi2
```
sudo apt-get install nodejs
sudo apt-get install npm
```
这时输入node无法进入提示符状态
需要
```
sudo apt-get install nodejs-legacy
```
安装好之后，可以用node进入或执行js了
```
node -v
v4.2.6
```
v4.2.6是2016年初发布的LTS版本

## Hello
编辑js文件
> vi server.js

```js
var http = require('http');

http.createServer(function (request, response) {

	// 发送 HTTP 头部
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```
执行js文件
	node server.js

在Win本地，访问
http://127.0.0.1:8888/
开放好pi2的端口，访问
http://cosmicy.vicp.cc:8888/


# nodejs开发指南笔记
## issue1
《node.js开发指南》partial is not defined

由于ejs的升级，《node.js开发指南》中使用的  partial 函数已经摒弃，使用foreach，include代替

原来的代码是：
```
<%- partial('listitem',items) %>
```
修改为：
```
<ul><% items.forEach(function(listitem){ %>
    <% include listitem %>
    <% }) %>
</ul>
```

## issue2
express 3.0.x 中默认不支持layout.ejs的解决方法 - zhangxh_Doris - 博客园
http://www.cnblogs.com/zhangXH/p/3616727.html?utm_source=tuicool&utm_medium=referral


# mongodb
## 安装
- 在官网下载安装包，158M，
- 安装
- 设定环境变量，c:\program files\mongo
- 在E盘建立cyData目录，建立db目录
在db上一层打开终端，启动mongodb
	mongod --dbpath=db

将会出现一些信息，最终停留于服务状态
之后需要另外开启终端，执行其他命令

## 第一次连接
使用nodejs
- 建立项目目录
```
mkdir myproject
cd myproject
```
- npm初始化package.json
```
npm init
```
里面回答各项信息
- 安装mongodb插件
```
npm install mongodb --save
```
- 新建app.js文件
```javascript
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});
```
- 运行app.js
	node app.js
显示"Connected successfully to server"

## 插入数据


