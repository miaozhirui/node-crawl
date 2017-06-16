var read = require('./read');
var save = require('./save');
var async = require('async');

var categoryUrl = 'http://top.baidu.com/category?c=10&fr=topindex';
var articleUrl = 'http://top.baidu.com/buzz?b=7&c=10&fr=topcategory_c10';

var categories = [];
var artiles = [];

async.series([

    //1. 得到分类列表
    function (done) {

        read.category(categoryUrl, function (list) {

            categories = list;

            done();
        })

    },

    //2. 把分类列表保存到数据库中
    function (done) {

        save.category(categories, done);
    },

    //读取文章列表
    function (done) {

        async.forEach(categories, function (category, next) {

            read.article('http://top.baidu.com/buzz?b='+ category.id +'&c=10&fr=topcategory_c10', category.id, function (items) {

                artiles = artiles.concat(items);

                next()
            })
        }, done)
    },

    /**
     * 读取文章
     * @param done
     */
    function (done) {

        save.article(artiles, done)

    }

], function (err, result) {

    console.log('所以的任务完成了');
})














