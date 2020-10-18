const { User } = require('../../model/user')
module.exports = async(req, res) => {

    // 标识，表示当前访问的是用户页面
    req.app.locals.currentLink = 'user'
        // 接受客户端当前页参数
    let page = req.query.page || 1
        // 每一页数据条数
    let pagesize = 10
        // 查询数据总数
    let count = await User.countDocuments({})
        // 总页数
    let total = Math.ceil(count / pagesize)

    // 页码对应的数据查询开始的位置
    let start = (page - 1) * pagesize

    let users = await User.find({}).limit(pagesize).skip(start)

    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
}