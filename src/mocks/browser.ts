import { setupWorker, rest, RESTMethods, ResponseResolver } from 'msw';

function createProxy(url: string, resolver: ResponseResolver) {
  return Object.values(RESTMethods).map((method) => {
    return rest[method.toLowerCase() as Lowercase<typeof method>](
      url,
      resolver
    );
  });
}

export const handlers = [
  ...createProxy('/api/*', async (req, res, ctx) => {
    const proxy = await ctx.fetch(req);
    // How to proxy all /api to https://reqres.in/api
    return res(
      ctx.status(proxy.status)
      // ctx.set(proxy.headers as any),
      // ctx.body(await proxy.text())
    );
  }),
];

export const worker = setupWorker(...handlers);
