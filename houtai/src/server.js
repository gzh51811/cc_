const Koa = require('koa');
const static = require('koa-static');

const routers = require('./api/routers');

const app = new Koa();

app.use(static('./'));
app.use(routers.routes());

app.listen(1811, () => {
    console.log('server is running on http://loaclhost:1811');
});
