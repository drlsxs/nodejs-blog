const { User, validateUser } = require('../../model/user')

const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body)
    } catch (ex) {
        // return res.redirect(`/admin/user-edit?message=${ex.message}`)

        return next(JSON.stringify({ path: '/admin/register', message: ex.message }))


    }
    let user = await User.findOne({ email: req.body.email })
        // 是否存在？
    if (user) {
        // redirect除了重定向还会发出res.end()，所以需要return
        return next(JSON.stringify({ path: '/admin/register', message: '邮箱地址已经被占用' }))

    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    req.body.password = password
    await User.create(req.body)
    res.redirect('/admin/login')





}