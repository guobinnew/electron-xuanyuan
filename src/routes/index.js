/**
 * Created by unique on 2018/5/26.
 */
var express = require('express');
var settings = require('../setting');
var logs = require('../config/logger.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
const mysql = require("mysql");

module.exports = function (app) {

    app.get('/',function (req, res, next) {
        if(!res.locals.user){
            res.redirect('/login')
            return
        }
        next();
    });

    app.get('/home',function (req, res) {
        res.render('home', {
            title: res.locals.appTitle
        });
    });

    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));

    /*
    app.use('/reg',require('./reg'));
    app.use('/posts',require('./posts'));
    */

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404',{
                title : 'Not Found',
            });
        }
    });
};
