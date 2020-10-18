const obj = { path: '/admin/user-edit', message: '邮箱地址已经被占用', id: 3 }
const str = JSON.stringify(obj)
    // console.log(str)
    // str = {"path":"/admin/user-edit","message":"邮箱地址已经被占用"}
const object = JSON.parse(str)
    // console.log(object)
    // object = { path: '/admin/user-edit', message: '邮箱地址已经被占用' }

// 使用for循环吧参数扔到后面
let params = []
for (let attr in object) {
    // 输出对象的键
    // console.log(attr)
    if (attr != 'path') {
        params.push(attr + '=' + object[attr])
            // 输出对象的值
        console.log(object[attr])
            // 输出数组
        console.log(params)
    }


}
// 把数组以&拼接成字符串
console.log(params.join('&'))
    // res.redirect(`${result.path}?${params.join('&')}`)