/**
 * Created by unique on 2018/5/26.
 */
(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var partials = require('express-partials');
    var settings = require('./setting');
    var session = require('express-session'); // session中间件
    var flash = require('connect-flash'); // 页面通知提示的中间件，基于 session 实现
    var winston = require('winston');
    var expressWinston = require('express-winston');
    var routes = require('./routes');
    var logs=require('./config/logger.js');
    var app = express();


    // 设置模板目录
    app.set('views', path.join(__dirname, 'views'));
    // 设置模板引擎为 ejs
    app.set('view engine', 'ejs');

    // root参数指定静态文件的根目录
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(session(settings.session));
    // flash中间件，用来显示通知信息
    app.use(flash());

    // 设置模板全局常量,用来挂载常量信息，比如：博客名，描述，作者信息等
    app.locals.app = settings.app;

    global.rootPath = __dirname;

    // 添加模板必需的三个变量
    app.use(function (req, res, next) {
        res.locals.user = req.session.user;
        res.locals.appTitle = settings.app.desc + '-' + settings.app.title + ' ' + settings.app.version;
        res.locals.success = req.flash('success').toString();
        res.locals.error = req.flash('error').toString();
        next();
    });

    // 正常请求的日志
    app.use(expressWinston.logger({
        transports: [
            new (winston.transports.Console)({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                filename: './logs/success.log'
            })
        ]
    }));

    // 路由
    routes(app);

    // 错误请求的日志
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                filename: './logs/error.log'
            })
        ]
    }));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err); // 如果使用了 next(error)，则会返回错误而不会传递到下一个中间件;
    });

    // error handler
    // 处理所有error请求,并加载error页面，显示错误信息
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.render('error', {
            title: 'Not Found',
            error: err
        });
    });

    var server = app.listen(settings.server.port, function () {
        logs.logger.log('info', '本地服务器启动，正在监听端口<' + server.address().port + '>...' );
    });
    module.exports = app;

}());