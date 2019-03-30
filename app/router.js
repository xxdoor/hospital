/*
* router
* */

const server = require('app/restify-server').server;
const path = require('path');
const fs = require('fs');
const restify = require('restify');

let staticFile = path.join(__dirname, '../dist');

server.get('/', function (req, res) {
    let index = path.join(__dirname, '../dist/index.html');
    fs.readFile(index, function (err, data) {
        if (err) {
            console.log("error in read file");
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
    });
});

server.get('/js/:file', restify.plugins.serveStatic({directory: staticFile}));
server.get('/css/:file', restify.plugins.serveStatic({directory: staticFile}));
server.get('/img/:file', restify.plugins.serveStatic({directory: staticFile}));