var express = require('express');
var router = express.Router();
var settings = require('../setting');
var logs=require('../config/logger.js');
var checkLogin = require('../middlewares/check').checkLogin;

//退出
router.get('/', checkLogin, function (req, res, next) {
    res.redirect('/asset/stat');
});

router.get('/stat', checkLogin, function (req, res, next) {
    res.render('asset_stat', {
        title: res.locals.appTitle
    });
});

module.exports = router;