const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(
    '/api/auth/admin/signin',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/auth/doctor/signin',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/doctor/details',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/doctor/signup',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  // Proxy requests to the patient authentication service
  app.use(
    '/api/auth/patient/signin',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/patient/signup',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/currentUser',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/admin/signup',
    createProxyMiddleware({
      target: 'https://localhost:5000',
      changeOrigin: true,
    })
  );  app.use(
    '/api/posts',
    createProxyMiddleware({
      target: 'https://localhost:5001',
      changeOrigin: true,
    })
  );
}
