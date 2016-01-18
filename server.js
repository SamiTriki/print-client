var restify = require('restify');
var server = restify.createServer();

server.use(restify.queryParser());
server.pre(restify.pre.sanitizePath());




