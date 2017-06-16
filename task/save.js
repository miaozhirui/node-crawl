var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({

    host:'47.94.14.249',
    user: 'root',
    password: 'MyNewPass4!',
    database: 'crawl',
    typeCase:false
    // charset: ''
})

/**
 * 把分类列表存入数据库
 * @param lists
 * @param callback
 */
exports.category = function (lists, callback) {

    async.forEach(lists, function (item, next) {

        var sql = 'replace into category(id, name, url) values(?,?,?)';

        pool.query(sql, [item.id, item.name, item.url], function (err,data) {

            if(err) console.error(err);

        });

        next()

    }, callback)
}


/**
 * 把文章列表存入数据库
 * @param lists
 * @param callback
 */
exports.article = function (lists, callback) {

    async.forEach(lists, function (item, next) {

        var sql = 'replace into article(name, url,cid) values(?,?,?)';

        pool.query(sql, [item.name, item.url, item.cid], function (err,data) {

            if(err) console.error(err);

        });

        next();
    }, callback)
}

