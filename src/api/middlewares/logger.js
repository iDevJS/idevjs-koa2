export default async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`time costs:${ctx.method} ${ctx.url} - ${ms}ms`)
}
