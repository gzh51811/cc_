// 用户列表路由 初始化
const Router = require('koa-router');

const db = require('../db');

// 创建路由
let router = new Router();
const ObjectId = require('mongodb').ObjectId;

// 查询用户集合
router.get('/',async (ctx, next) => {
    let {
        page,
        limit
    } = ctx.query;
    limit = limit * 1;
    qty = (page - 1) * limit;
    let str = await db.find('user', {}, qty, limit);
    let str3 = await db.find('user', {});
    ctx.body = {
        code: 0,
        data: str,
        count: str3.length
    };
});
router.post('/', async (ctx, next) => {
    let {
        _id
    } = ctx.request.body;
    let str = await db.delete('user', {
        _id: ObjectId(_id)
    });
    let str2 = {
        code: 0,
        data: str,
    }
    ctx.body = str2;
});


module.exports = router;