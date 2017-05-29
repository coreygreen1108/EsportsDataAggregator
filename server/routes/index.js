module.exports = async function(ctx, next){
	console.log(ctx.method);
	console.log(ctx.path.slice(1).split('/'));
	console.log(ctx.query);
	await next();
}