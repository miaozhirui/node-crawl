// http://top.baidu.com/category?c=10&fr=topindex
//字符集规了哪个数字代表哪个字符；编码是同样的表示字符，不同的编码表示方式不同
// var baseUrl = 'http://top.baidu.com';

var request = require('request');//拉取网页内容
var cheerio= require('cheerio');//实现jquery功能
var iconv = require('iconv-lite');//把gbk转成utf8
var u = require('url');

/**
 * res响应对象
 * body响应体
 */

exports.category = function (url, callback) {

    request({url:url, encoding:null}, function (err,res,body) {

        if(err) console.error(err);

        //把gbk编码的buffer转成utf8编码的字符串
        body = iconv.decode(body, 'gbk');

        var $ = cheerio.load(body);

        var items =[];
        //找到所有的分类的A标签并进行转换
        $('.hd .title a').each(function () {

            // <a href="./buzz?b=353&amp;c=10">玄幻奇幻</a>
            var $me = $(this);
            var item = {

                name: $me.text().trim(),
                url: $me.attr('href')
                // url: baseUrl + $me.attr('href').slice(1),
            }

            var urlObj = u.parse(item.url, true);

            item.id = urlObj.query.b;

            items.push(item);
        })

        callback(items);

    });
}

exports.article = function (url, cid, callback) {

    request({url:url, encoding:null}, function (err,res,body) {

        if(err) console.error(err);

        //把gbk编码的buffer转成utf8编码的字符串
        body = iconv.decode(body, 'gbk');

        var $ = cheerio.load(body);

        var items =[];
        //找到所有的分类的A标签并进行转换
        $('.keyword .list-title').each(function () {

            // <a href="./buzz?b=353&amp;c=10">玄幻奇幻</a>
            var $me = $(this);

            var item = {

                name: $me.text().trim(),
                url: $me.attr('href'),
                cid: cid
            }

            items.push(item);
        })

        callback(items);
        //console.log(items);

    });
}






