// 添加用户路由
const Router = require('koa-router');

const db = require('../db');

// 创建路由
let router = new Router();
router.get('/',async (ctx,next)=>{
    let {username , code } = ctx.query;
    if(code == 1){
        let str = await db.find('user',{username:username});
        ctx.body = str;
    }
});

router.post('/', async (ctx,next)=>{
    let {username , code ,password,sex,phone,regtime,intro,name} = ctx.request.body;
    if(code == 2){
        let str2 = await db.insert('user',{username,password,sex,phone,regtime,intro,name,data_id:2,power:'普通会员'} );
        ctx.body = str2;
    }
});

module.exports = router;