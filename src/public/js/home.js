/**
 * Created by unique on 2018/5/24.
 */
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",  //主机地址
    user: "root", //数据库用户名
    password: "123465gb", //数据库用户密码
    database: "xuanyuan"  //数据库名
});

function getQueryStringArgs(q){
    var qs = q.split('?')[1] || (location.search.length > 0 ? location.search.substring(1) : ''),
        query = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for(i = 0; i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            query[name] = value;
        }
    }
    return query;
}

$(document).ready(function() {

    var $user = $('#userMenu')
    var host = getQueryStringArgs(window.location.href)
    connection.connect();   //数据库连接
    // 获取用户信息，检验是否正确
    const sql = 'select * from user where user_id=' + host.user
    connection.query(sql, function (err, result) {
        if(err){
            $.alert({
                title: '错误',
                content: '获取用户信息失败<'+ host.user + '！',
                buttons:{
                    confirm:{
                        text:'关闭'
                    }
                }
            })
            return
        }
        console.log(result)
        $user.text(result[0].user_nick)
    })
})

