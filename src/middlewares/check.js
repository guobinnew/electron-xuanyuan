module.exports = {
    // 路由中间件
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/login');
        }
        next();
    },
    checkNotLogin: function (req, res, next) {
        backURL = req.header('Referer') || '/';
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect(backURL); // 返回之前的页面
        }
        next();
    },
    checkNotAdmin: function (req, res, next) {
        backURL = req.header('Referer') || '/';
        if (req.session.user) {
            req.flash('error', '需要管理员权限');
            return res.redirect(backURL); // 返回之前的页面
        }
        next();
    }
};
