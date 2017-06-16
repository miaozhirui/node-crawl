/**
 * 1. 有分页
 * 2. 可以查询
 * 3. 点击分类可以切换文章
 * 4. 点击文章还可以跳到百度贴吧对应的贴吧
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/**
 * 写一个计划任务，在子进程里面执行一个脚本
 * 起一个子进程
 */

var spawn = require('child_process').spawn;
var CronJob = require('cron').CronJob;

//每隔30秒执行一个任务，执行一个脚本，让它再子进程里面执行，不影响主进程的执行
var job = new CronJob('*/30 * * * * *', function () {
    console.log('开始输出了');
    //创建一个子进程
    var child = spawn('node', ['./task/main.js']);

    //把子进程的标准输出输入到主进程的标准输出
    child.stdout.pipe(process.stdout);

    //把子进程的错误输出输入到主进程的错误输出
    child.stderr.pipe(process.stderr);
})

job.start();























