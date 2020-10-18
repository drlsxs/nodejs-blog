const express = require('express')

const path = require('path')

const bodyParser = require('body-parser')

const session = require('express-session')

const template = require('art-template')

const dateFormat = require('dateformat')

const app = express()

require('./model/connect')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

template.defaults.imports.dateFormat = dateFormat


const home = require('./router/home')
const admin = require('./router/admin')

// 拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home)
app.use('/admin', admin)

app.use((err, req, res, next) => {

    const result = JSON.parse(err)
        // 使用for循环吧参数扔到后面
    let params = []
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr])

        }


    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

app.listen(80)
console.log('server is running')