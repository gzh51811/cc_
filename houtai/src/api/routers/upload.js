const Router = require('koa-router');
const fs = require('fs');

let router = new Router();

router.post('/', async (ctx)=>{
  console.log(ctx.request.files)
  const file = ctx.request.files.images;    // 获取上传文件
  // console.log(file);
  const reader = fs.createReadStream(file.path).path;    // 创建可读流

  let imagename = reader.split('/').pop();
  ctx.body = {
      code: 0,
      imagename: imagename,
      msg: '上传成功'
  };
})
module.exports = router;