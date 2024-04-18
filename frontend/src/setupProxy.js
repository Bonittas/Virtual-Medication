const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(
    '/api/auth/admin/signin',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/auth/doctor/signin',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/doctor/signup',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );
  // Proxy requests to the patient authentication service
  app.use(
    '/api/auth/patient/signin',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/patient/signup',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth/currentUser',
    createProxyMiddleware({
      target: 'https://medicare-3.onrender.com/',
      changeOrigin: true,
    })
  );
  // Proxy requests to the post service
  app.use(
    '/api/posts',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
}
