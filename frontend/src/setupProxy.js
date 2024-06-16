const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(
    '/api/auth/admin/signin',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/auth/doctor/signin',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/doctor/details',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/doctor/signup',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  // Proxy requests to the patient authentication service
  app.use(
    '/api/auth/patient/signin',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/patient/signup',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  // app.use(
  //   '/api/auth/currentUser',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000/',
  //     changeOrigin: true,
  //   })
  // );
    app.use(
    '/api/auth/patient/currentUser',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/admin/signup',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );  app.use(
    '/api/posts',
    createProxyMiddleware({
      target: 'https://localhost:5001',
      changeOrigin: true,
    })
  );
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
      ws: true, // Enable WebSocket proxying
    })
  );
  app.use(
    '/api/auth/payment/initialize',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/add',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
}
