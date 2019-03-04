// 添加用户路由
const Router = require('koa-router');

const db = require('../db');

// 创建路由
let router = new Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/',async (ctx, next)=>{
    let {username , code } = req.query;
    if(code == 1){
        let str = await db.find('user',{'username':username});
        res.send(str);

    }
});

router.post('/', async (ctx, next)=>{
    let {username , code ,password,sex,phone,regtime,intro,name,_id} = ctx.request.body;
    if(code == 2){
        let sql = {'username':username,'password':password,'sex':sex,'phone':phone,'regtime':regtime,'intro':intro,'name':name,data_id:2,power:'普通会员'};
        let str2 = await db.update('user',{username:username},{$set:sql} );
        ctx.body = str2;
    }else if( code == 3){ 
        let str4 = await db.find('user',{'_id':ObjectId(_id)});
        ctx.body = str4;
    }
});

module.exports = router;