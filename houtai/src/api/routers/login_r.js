// 登录路由
const Router = require('koa-router');

const db = require('../db');
const token = require('../utils/token');

// 创建路由
let router = new Router();

// 登录
router.post('/', async (ctx, next) => {
    // post请求的参数
    let {
        username,
        password
    } = ctx.request.body;
    // console.log(username,password); password:password
    let _token = token.create(username);
    let str = await db.find('user',{username,password});
    // let res = JSON.parse(str);
    // console.log(res);
    // console.log(str,_token);
    ctx.body = {
        token:_token,
        str
    };
});


module.exports = router;