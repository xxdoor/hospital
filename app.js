/*
* 启动文件
* */

process.env.PORT = 18080;

const path = require('path');
const port = process.env.PORT;

global.ROOT = path.resolve(__dirname);
require('app-module-path').addPath(__dirname);
require('app/router');
const server = require('app/restify-server').server;
server.listen(port, function () {
    console.log(`server running at ${port}`);
});