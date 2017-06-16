var mysql = require('mysql');

var pool = mysql.createPool({

    host: '47.94.14.249',
    user: 'root',
    password: 'MyNewPass4!',
    database: 'crawl'
})

exports.category = function (cb) {

    pool.query('select * from category', cb);
}

exports.article = function (cb) {

    pool.query('select * from article', cb);
}