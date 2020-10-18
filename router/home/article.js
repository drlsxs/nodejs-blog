const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')

module.exports = async(req, res) => {

    const id = req.query.id

    let article = await Article.findOne({ _id: id })

    // res.send(article)
    // return
    // 查询当前文章对应的评论信息
    let comments = await Comment.find({ aid: id })
        // res.send(comments)

    res.render('home/article', { article, comments })
}