// 依赖
var express = require('express')
var utility = require('utility')

//express实例
var app = express();

app.get('/',function(req, res){

	var q = req.query.q;

	if (q != null) {
		var md5 = utility.md5(q);
		var sha1 = utility.sha1(q);
		res.send(md5 + '<br>' + sha1);
		//res.send(sha1); //不能再次send
	} else {
		res.send('q undefined');
	}

});

app.listen(3000, function (req,res) {
	console.log('app is runnin at port 3000');
});

