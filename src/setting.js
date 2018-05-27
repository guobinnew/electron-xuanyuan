module.exports = {
    app: {
        title: '轩辕',   //应用名
        desc: '资产管理工具',   //应用描述
        version: 'v1.0.0'   //版本
    },
    db: {
        host: "localhost",  //主机地址
        user: "root", //数据库用户名
        password: "123465gb", //数据库用户密码
        database: "xuanyuan"  //数据库名
    },
    server: {
        port: 3000  //  本地服务端口
    },
    session: {
        secret:'ostw',  // 会话
        key: 'xuanyuan', //cookie
        cookie: {secure: false, maxAge: null},
        resave:true,
        saveUninitialized: true
    }
};
