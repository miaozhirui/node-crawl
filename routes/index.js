var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../db');


router.get('/', function(req, res, next) {

  //1. 读取文章的列表和分类的列表
  async.parallel({

      categories: function(cb) {

        db.category(cb);
      },

      articles: function (cb) {

        db.article(cb);
      }
  }, function(error, result) {
      res.send('respond with a resource');
     //可以拿到数据 console.log(result.categories[0]);分配到页面中
  });

});



module.exports = router;
