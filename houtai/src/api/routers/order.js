const Router = require('koa-router');

const ObjectId = require('mongodb').ObjectId;
const db = require('../db');

// 创建路由
let router = new Router();
//渲染
router.get('/', async (ctx, next) => {
    let {
        page,
        limit,
        _id
    } = ctx.query;
    limit = limit * 1;
    qty = (page - 1) * limit;
    if (_id) {
        let res = await db.find('crat', {
            "_id": ObjectId(_id)
        });
        ctx.body = {
            code: 0,
            data: res
        }
    } else {
        let res = await db.find('crat');
        let res2 = await db.find('crat', {}, qty, limit);
        ctx.body = {
            code: 0,
            data: res2,
            count: res.length
        }
    }
});
//删除
router.get('/del', async (ctx, next) => {
    let {
        _id
    } = ctx.query;
    if (_id) {
        let res = await db.delete('crat', {
            "_id": ObjectId(_id)
        });
        ctx.body = {
            code: 0,
            data: res,
            count: 100
        }
    }
});
//删除多个
router.get('/delALL', async (ctx, next) => {
    let obj = ctx.query;
    let arr = [];
    for (let key in obj) {
        arr.push(obj[key]);
    }
    arr.map(async item => {
        let res = await db.delete('crat', {
            "_id": ObjectId(item)
        });
    })

    ctx.body = {
        code: 0
    }
});
//更改状态
//分类更改
router.get('/upd', async (ctx, next) => {
    let {
        _id,
        status
    } = ctx.query;
    let data = {
        status
    };
    let res = await db.update('crat', {
        "_id": ObjectId(_id)
    }, {
        $set: data
    });

    ctx.body = res;
});
module.exports = router;