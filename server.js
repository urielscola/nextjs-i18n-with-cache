const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('./i18n');

const routes = require('./routes');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});
const handler = routes.getRequestHandler(app);

// Cache configuration parameters.
const ssrCache = new LRUCache({
  max: 50 * 1024 * 1024,
  length: n => n.length,
  maxAge: 1000 * 10
});

const renderAndCache = async (req, res) => {
  const { path } = req;
  const hasCache = ssrCache.has(path);

  if (hasCache) {
    console.log(`Serving from cache ${path}`);
    res.setHeader('x-cache', 'HIT');
    return res.send(ssrCache.get(path));
  }

  try {
    console.log(`path: ${path} not cached.`);
    const html = await app.renderToHTML(req, res, path, req.query);

    if (res.statusCode !== 200) return res.send(html);

    // Set cache
    ssrCache.set(path, html);

    res.setHeader('x-cache', 'MISS');
    return res.send(html);
  } catch (err) {
    return app.renderError(err, req, res, req.path, req.query);
  }
};

(async () => {
  await app.prepare();
  const server = express();
  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/_next/*', handler);
  server.get('/static/locales/**/*.json', handler);
  server.get('*', renderAndCache);
  server.listen(3001);
})();