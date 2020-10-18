const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')


// 创建集合规则
const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        state: {
            type: Number,
            required: true,
            default: 0
        }
    })
    // 创建集合
const User = mongoose.model('User', userSchema)
async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456', salt)
    const user = await User.create({
        username: 'drlsxs',
        email: '15680262661@163.com',
        password: pass,
        role: 'admin',
        state: 0
    }).then(() => {
        console.log('创建成功')
    }).catch(() => {
        console.log('失败')
    })

}
// createUser()

const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().error(new Error('邮箱不符合验证规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,16}$/).required().error(new Error('密码不符合验证规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不合法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值不合法'))

    }

    return Joi.validate(user, schema)

}




module.exports = {
    User,
    validateUser
}