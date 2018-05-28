var express = require('express')
var router = express.Router()
var crypto = require('crypto-js')
var settings = require('../setting')
var logs = require('../config/logger.js')
var checkNotLogin = require('../middlewares/check').checkNotLogin

const query = require("../middlewares/query")
const SHA1 = require("crypto-js/sha1")
/** 用于中断的信号 */
class BreakSignal {}

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('login', {
        title: res.locals.appTitle
    })
})

// POST /login
router.post('/',checkNotLogin,function (req,res,next) {

    var name = req.body.username
    var pwd = SHA1(req.body.userpwd).toString()
    logs.logger.log('info', '处理登录请求: 用户<' + name + '>, 密码<' + pwd +'>')

    // 获取用户信息，检验是否正确
    const sql = 'select * from user_view where name = "' + name + '"' + ' and password = "' + pwd + '";'
    query(sql).then(function (data){
        if(data.err) {
            throw new BreakSignal()
        }

        if(data.rows.length != 1){
            req.flash('error','用户名或密码错误')
            logs.logger.log('error', '用户名或密码错误')
            res.redirect('/login')
            return
        }

        req.flash('success','登录成功')
        logs.logger.log('info', '用户<' + name + '>登录成功')
        req.session.user = data.rows[0]
        // 跳转到主页
        res.redirect('/welcome')
    }).catch(BreakSignal, function (err) {
        req.flash('error', '查询数据库失败')
        logs.logger.log('error', '查询数据库失败')
        return res.redirect('/login')
    })
});
module.exports = router
