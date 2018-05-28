/**
 * Created by ods_h on 2018/5/27.
 */
var express = require('express')
var router = express.Router()
var settings = require('../setting')
var logs=require('../config/logger.js')
var checkLogin = require('../middlewares/check').checkLogin
const query = require("../middlewares/query")

function convertUTCDateToLocal(UTCDateString) {
    if(!UTCDateString){
        return '-'
    }
    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }
    var date2 = new Date(UTCDateString)
    var year = date2.getFullYear()
    var mon = formatFunc(date2.getMonth() + 1)
    var day = formatFunc(date2.getDate())
    var dateStr = year + '-' + mon + '-' + day
    return dateStr
}

/** 用于中断的信号 */
class BreakSignal {}

//退出
router.get('/assets', function (req, res, next) {
    //logs.logger.log('info', '用户<' + res.locals.user.user_name +'>请求Assets数据');

    // 分页
    var paging = ''
    if( req.query){

        if(req.query.search && req.query.search.length > 0){
            paging += ' where sn like "%' + req.query.search + '%" or type_name like "%' + req.query.search + '%"';
        }

        if(req.query.limit && req.query.offset){
            paging += ' limit ' + req.query.offset + ',' + req.query.limit;
        }
    }

    // 获取用户信息，检验是否正确
    const totalsql = 'select count(*) as total from asset_view;'
    const sql = 'select * from asset_view' + paging + ';'

    query(totalsql).then(function (data) {
        if (data.err) {
            throw new BreakSignal();
        }
        return data.rows[0].total
    }).then(function (num) {
        var result = {
            total: num,
            rows: []
        }
        if( num > 0 ){
           query(sql).then(function (data) {
               if (data.err) {
                   throw new BreakSignal();
               }

               req.flash('success', '数据请求成功！')
               result.rows = data.rows
               // 将时间改为本地时间
               for (var i = 0; i < data.rows.length; i++) {
                   data.rows[i].purchase_date = convertUTCDateToLocal(data.rows[i].purchase_date)
               }
               res.json(result)
           })
        }
        else {
            req.flash('error', '数据库为空')
            logs.logger.log('error', '数据库为空')
            res.json(result)
        }
    }).catch(BreakSignal, function (err) {
        req.flash('error', '查询数据库失败')
        logs.logger.log('error', '查询数据库失败')
        res.json({total: 0, rows: []})
    })

});
module.exports = router;