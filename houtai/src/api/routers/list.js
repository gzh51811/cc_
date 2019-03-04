const Router = require('koa-router');

const ObjectId = require('mongodb').ObjectId;
const db = require('../db');

// 创建路由
let router = new Router();
//渲染/list
router.get('/', async (ctx, next) => {
    let {
        page,
        limit,
        _id
    } = ctx.query;
    limit = limit * 1;
    qty = (page - 1) * limit;
    if (_id) {
        let res = await db.find('lsit', {
            "_id": ObjectId(_id)
        });
        ctx.body = {
            code: 0,
            data: res
        }
    } else {
        let res = await db.find('lsit');
        let res2 = await db.find('lsit', {}, qty, limit);
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
        let res = await db.delete('lsit', {
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
    console.log(ctx.query);
    let obj = ctx.query;
    let arr = [];
    for (let key in obj) {
        arr.push(obj[key]);
    }
    console.log(arr);
    arr.map(async item => {
        let res = await db.delete('lsit', {
            "_id": ObjectId(item)
        });
    })

    ctx.body = {
        code: 0
    }
});
//商品更改
router.post('/add', async (ctx, next) => {
    let {
        _id,
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
    let res = await db.update('lsit', {
        "_id": ObjectId(_id)
    }, {
        $set: data
    });

    ctx.body = res;
});


module.exports = router;