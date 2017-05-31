const Koa = require('Koa');
const app = new Koa();

//TODO: add logging and error catch middleware
app.use(async (ctx, next) => {
	ctx.db = require('../db');
	await ctx.db.sync(/*{force: true}*/);
	await next();
})

app.use(require('./routes'));

app.use(ctx => {
	ctx.body = 'pandas rule!';
})

app.listen(3000);
