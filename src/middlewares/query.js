/**
 * Created by ods_h on 2018/5/27.
 */

var mysql=require("mysql")
var settings=require('../setting')
var pool = mysql.createPool(settings.db)

module.exports = function (sql) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err,conn){
            if(err){
                reject(err);
            }else{
                conn.query(sql,function(err,rows,fields){
                    //释放连接
                    conn.release();
                    //传递Promise回调对象
                    resolve({"err":err, "rows":rows, "fields":fields});
                });
            }
        });
    });
};