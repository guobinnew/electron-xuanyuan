/**
 * Created by unique on 2018/5/25.
 */

var assert = require('chai').assert;
var expect = require('chai').expect;
const mysql = require("mysql");
var uuid = require('uuid');
var SHA1 = require("crypto-js/sha1");

describe('MySQL', function() {
    const config = {
        host: "localhost",  //主机地址
        user: "root", //数据库用户名
        password: "123465gb", //数据库用户密码
        database: "xuanyuan"  //数据库名
    };

    describe('连接测试', function() {
        const connection = mysql.createConnection(config);

        it('连接数据库', function () {
            connection.connect();   //数据库连接
            connection.end();
        });
    });

    describe('用户表测试', function() {
        const connection = mysql.createConnection(config);
        // 随机生成用户名
        const username = "user-" + uuid.v1();
        const addSql = 'insert user (user_id, user_name, user_password, user_privilege, user_email, user_nick) values(?,?,?,?,?,?)';
        const addSqlParams = [null, username, '' + SHA1("12345678"), 1, "bin.guo@ostw.com", "郭斌"];
        const delSql =  'delete from user where user_name = "' + username + '"';

        before(function() {
            connection.connect();   //数据库连接
        });

        after(function() {
            connection.end();   //数据库连接
        });

        it('创建用户', function (done) {

             connection.query(addSql, addSqlParams, function (err, result) {
                 expect(err).to.be.null;
                 expect(result).to.be.a('object');
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    done();
                    return;
                }
                console.log('INSERT ID:',result);
                done();
            });
        });

        it('重复创建用户', function (done) {
            connection.query(addSql, addSqlParams, function (err, result) {
                expect(err).to.be.not.null;
                expect(result).to.be.undefined;
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                }
                done();
            });
        });

        it('查询用户', function (done) {
            const sql = "select * from user";
            connection.query(sql, function (err, result) {
                expect(err).to.be.null;
                expect(result).to.have.length.of.at.least(1);

                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    done();
                    return;
                }
                console.log(result);
                done();
            });
        });

        it('删除用户', function (done) {
            connection.query(delSql, function (err, result) {
                expect(err).to.be.null;
                expect(result).to.be.a('object');
                if(err){
                    console.log('[DELETE ERROR] - ',err.message);
                    done();
                    return;
                }
                console.log('DELETE success',result.affectedRows);
                done();
            });
        });

    });

    describe('资产表测试', function() {

    });
});


