// 依赖
var express = require('express')
var utility = require('utility')

//express实例
var app = express();

app.get('/',function(req, res){

	var q = req.query.q;

	var md5 = utility.md5(q);
	
	res.send(md5);
});

app.listen(3000, function (req,res) {
	console.log('app is runnin at port 3000');
});

