"use strict";

var restify = require('restify');
var server = restify.createServer();
var printJobs = require('./controllers/printJobs');
var printInfos = require('./controllers/printInfos');
var config = require('./controllers/configuration');

module.exports = () => {
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.pre(restify.pre.sanitizePath());

    // print
    server.get("/print/document", printJobs.printFile);
    server.post("/print/label", printJobs.label);

    // conf
    server.get("/config", config.show);
    server.put("/config", config.update);
    server.post("/config/reset", config.reset);

    server.get("/printers", printInfos.list);
    // keep at the end of routes
    server.get(/.*/, restify.serveStatic({
        'directory': 'public',
        'default': 'index.html'
     }));

    server.listen(2000, function () {
        console.log('%s running on %s', server.name, server.url);
    });

};
