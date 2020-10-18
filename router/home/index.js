const { Article } = require('../../model/article')

const pagination = require('mongoose-sex-page')

module.exports = async(req, res) => {

    const page = req.query.page
        // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().exec()

    // res.send(result)
    // 渲染模板并传递数据
    res.render('home/default', {
        result: result
    })
}