const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')

module.exports = (req, res) => {

    // res.send('ok')
    //1. 创建构造函数实例
    const form = new formidable.IncomingForm()
        // 2.配置上传文件的存放路径
    form.uploadDir = path.join(__dirname, "../../public/uploads")
        // 3.保留上传文件的后缀
    form.keepExtensions = true
        // 4.解析表单
    form.parse(req, (err, fields, files) => {
        // err错误对象
        // fields对象类型，保存了普通表单数据
        // files对象类型，保存了和上传文件相关的数据
        // res.send(files.cover.path.split('public')[1])
        // res.send(fields)
        Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content

        })

        res.redirect('/admin/article')

    })


}