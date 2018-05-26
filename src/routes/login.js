var express = require('express');
var router = express.Router();
var crypto = require('crypto-js');
var settings = require('../setting');
var logs=require('../config/logger.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

const mysql = require("mysql")
const SHA1 = require("crypto-js/sha1")

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('login', {
        title: res.locals.appTitle
    });
});

// POST /login
router.post('/',checkNotLogin,function (req,res,next) {

    const connection = mysql.createConnection(settings.db);
    connection.connect();

    var name = req.body.username;
    var pwd = SHA1(req.body.userpwd).toString()
    logs.logger.log('info', 'Login user:' + name + ', pwd:' + pwd);

    // 获取用户信息，检验是否正确
    const sql = 'select * from user where user_name="' + name + '"'
    connection.query(sql, function (err, result) {
        if(err){
            req.flash('error','用户不存在');
            logs.logger.log('debug', '查询数据库失败');
            return res.redirect('/login');
        }

        if(result.length != 1){
            req.flash('error','用户名或密码错误');
            logs.logger.log('debug', '用户名或密码错误');
            return res.redirect('/login');
        }

        req.flash('success','登录成功');
        logs.logger.log('debug', `用户${name}登录成功`);
        req.session.user = result[0];
        // 跳转到主页
        res.redirect('/home');
    })
});
module.exports = router;
