const { User } = require('../../model/user')

const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {
    // res.send('ok')
    const { username, email, role, state } = req.body //用户在表单中输入的内容
    const id = req.query.id //用户id
        // 用户信息匹配
    let user = await User.findOne({ _id: id })

    // res.send(user)

    // 密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password)

    if (isValid) {
        // 密码成功
        // res.send('密码比对成功')
        // 将用户信息更新到数据库中
        //后面参数大括号的作用是把除了密码的信息更新到数据库中，不能用req.body
        await User.updateOne({ _id: id }, {
                username: username,
                email: email,
                role: role,
                state: state

            })
            // 重定向页面
        res.redirect('/admin/user')
    } else {
        // 密码失败
        // res.send('密码比对失败')
        let obj = { path: '/admin/user-edit', message: '密码匹配失败,不能进行用户信息修改', id: id }
        next(JSON.stringify(obj))
    }



}