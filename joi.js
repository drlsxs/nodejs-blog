const Joi = require('joi')

const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
}


async function run() {
    try {
        await Joi.validate({ username: 'aabb', birth: 1800 }, schema)
    } catch (ex) {
        console.log(ex.message)
        return
    }
    console.log('验证通过')

}

run()