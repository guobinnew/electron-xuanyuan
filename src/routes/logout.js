/**
 * Created by ods_h on 2018/5/26.
 */

var express = require('express');
var router = express.Router();
var settings = require('../setting');
var logs=require('../config/logger.js');
var checkLogin = require('../middlewares/check').checkLogin;


//退出
router.get('/', checkLogin, function (req, res, next) {
    logs.logger.log('info', '用户<' + req.session.user.user_name +'>退出登录状态');

    req.session.user = null;//清空session
    req.flash('sucess', '退出成功！');
    res.redirect('/login');
});
module.exports = router;