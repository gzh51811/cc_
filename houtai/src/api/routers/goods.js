const Router = require('koa-router');

const db = require('../db');

// 创建路由
let router = new Router();

router.post('/', async (ctx, next) => {
    let {
        desc,
        interest,
        num,
        price,
        presentPrice,
        username,
        usernameF,
        timer
    } = ctx.request.body;
    let data = {
        desc,
        interest,
        num,
        price,
        presentPrice,
        username,
        usernameF,
        timer
    };
    let res = await db.insert('lsit',data);

    ctx.body = res;
});


module.exports = router;