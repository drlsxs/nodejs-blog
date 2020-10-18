const user = require("../model/user")

const guard = (req, res, next) => {
    if (req.url == '/register') {
        next()
    }
    // 不是登录页面并且还没有登录
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        if (req.session.role == 'normal' && req.url == '/user') {
            return res.redirect('/admin/login')
        }
        next()
    }
}

module.exports = guard