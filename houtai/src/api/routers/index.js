const Router = require('koa-router');
const KoaBody = require('koa-body');
const path = require('path');

//创建路由
const router = new Router();

const listRouter = require('./list');
const goodsRouter = require('./goods');
const orderRouter = require('./order');
const sortRouter = require('./sort');
const uploadRouter = require('./upload');
// 引入页面路由

const loginRouter = require('./login_r');
const userListRouter = require('./user_list');
const userAddRouter = require('./user_add');
const userUpdateRouter = require('./user_update');
const tokenverifyRouter = require('./tokenverify');

router.use(KoaBody({
    // 支持formdata
    multipart: true,
    uploadDir: './uploads',
    // 文件支持
    formidable: {
        // 指定保存路径
        uploadDir: './uploads',
        keepExtensions: true,
        // 改文件名
        onFileBegin(filename, file) {
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
            var extName = path.extname(file.name);

            file.path = './uploads/' + filename + Date.now() + extName;
        }
    }
}));
router.use('/list', listRouter.routes());
router.use('/goods', goodsRouter.routes());
router.use('/order', orderRouter.routes());
router.use('/sort', sortRouter.routes());
router.use('/upload', uploadRouter.routes());

router.use('/login_r', loginRouter.routes());
router.use('/user_list', userListRouter.routes());
router.use('/user_add', userAddRouter.routes());
router.use('/user_update', userUpdateRouter.routes());
router.use('/tokenverify', tokenverifyRouter.routes());

module.exports = router;