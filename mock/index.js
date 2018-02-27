const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const constant = require('../src/constant');
const { SAVE_DATA } = constant.api;

router.post(SAVE_DATA, (ctx, next) => {

});

router.get('/mock/test', (ctx, next) => {
  ctx.body = {
    is_success: true,
    code: '200',
    msg: '成功',
    result: 'hhh'
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 4000;

app.listen(port, '127.0.0.1', () => {
  console.log(`[mock server]: start at port ${port}`);
})