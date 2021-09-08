import {
  setupWorker,
  rest,
  RESTMethods,
  ResponseResolver,
  RestRequest,
  RestContext,
} from 'msw';
import { headersToObject } from 'headers-utils';

function createProxy(
  url: string,
  resolver: ResponseResolver<RestRequest, RestContext>
) {
  // TODO: replace with rest.all() in the newest version
  return Object.values(RESTMethods).map((method) => {
    return rest[method.toLowerCase() as Lowercase<typeof method>](
      url,
      resolver
    );
  });
}

const makeProxy = (fromUrl: string, toUrl: string) => {
  return createProxy(fromUrl, async (req, res, ctx) => {
    const proxyUrl = new URL(req.url.pathname, toUrl);
    const proxy = await ctx.fetch(proxyUrl.href);

    return res(
      ctx.status(proxy.status),
      ctx.set(headersToObject(proxy.headers)),
      ctx.body(await proxy.text())
    );
  });
};

export const handlers = [...makeProxy('/api/*', 'https://reqres.in')];

export const worker = setupWorker(...handlers);
