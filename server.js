"use strict";

var restify = require('restify');
var server = restify.createServer();
var printJobs = require('./controllers/printJobs');

module.exports = () => {
    server.use(restify.queryParser());
    server.pre(restify.pre.sanitizePath());

    server.get("/certified", printJobs.certified);

    // keep at the end of routes
    server.get(/.*/, restify.serveStatic({
        'directory': 'public',
        'default': 'index.html'
     }));

    server.listen(2000, function () {
        console.log('%s running on %s', server.name, server.url);
    });

};
