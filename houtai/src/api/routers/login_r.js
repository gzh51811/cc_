// 登录路由
const Router = require('koa-router');

const db = require('../db');

// 创建路由
let router = new Router();
const bodyParser = require('body-parser');

// 创建urlencoded 编码解析（把请求头content-type值为application/x-www-form-urlencoded时的数据格式化到request.body中）
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
const jsonParser = bodyParser.json();

// 登录
router.post('/', jsonParser, urlencodedParser, async (req, res) => {
    // post请求的参数
    let {
        username,
        password
    } = req.body;
    // console.log(username,password); password:password
    str = await db.find('user', {
        username: username,
        password: password
    });
    res.send(str);
});


module.exports = router;