const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app) {
    app.use('/auth/google', createProxyMiddleware({ target: 'http://localhost:5000' }))
    app.use('/auth/getuser', createProxyMiddleware({ target: 'http://localhost:5000' }))
    app.use('/auth/logout', createProxyMiddleware({ target: 'http://localhost:5000' }))
    app.use('/activities/*', createProxyMiddleware({ target: 'http://localhost:5000' }))
    app.use('/complaints/*', createProxyMiddleware({ target: 'http://localhost:5000' , changeOrigin : true}))
    app.use('/valuables/', createProxyMiddleware({ target: 'http://localhost:5000' }))

}