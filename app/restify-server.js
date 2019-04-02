/*
* 实现服务端返回页面
* */

const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.gzipResponse());

module.exports = {
    server: server
};