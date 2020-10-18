const bcrypt = require('bcrypt')
const { User } = require('../../model/user')
module.exports = async(req, res) => {
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
        // 查询到为对象，没有为空
    let user = await User.findOne({ email })
    if (user) {
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 登录成功
            // 将数据库查询到username储存到req上去
            // session是express-session模块添加的
            req.session.username = user.username
            req.session.role = user.role
                // 把查询到的用户信息挂载到locals对象上面·
            req.app.locals.userInfo = user
            if (user.role == 'admin') {
                res.redirect('/admin/user')
            } else {
                res.redirect('/home/')
            }
        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
}