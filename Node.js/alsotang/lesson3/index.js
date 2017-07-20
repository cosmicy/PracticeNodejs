var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

app = express();

app.get('/', function(req, res, next) {
	
	superagent.get('https://cnodejs.org')
		.end(function (err, sres) {
			if (err) {
				return next(err);
			}

			//sres.text存储网页html内容
			var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_list.topic_title').each(function(index, el) {
				var $el = $(el);
				items.push({
					title: $el.attr('title'),
					href: $el.attr('href')
				});
			});

			res.send(items);

		});

});

app.listen(300,function(){
	console.log('app is listening at port 3000');
})