"use strict";

const restify = require('restify');
const bugsnag = require('bugsnag');
const server = restify.createServer();
const printJobs = require('./controllers/printJobs');
const printInfos = require('./controllers/printInfos');
const config = require('./controllers/configuration');
const update = require('./controllers/update');
const logs = require('./controllers/logs');

module.exports = () => {

    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.pre(restify.pre.sanitizePath());
    server.pre(restify.CORS());

    // print
    server.post("/print/document", printJobs.printFile);
    server.post("/print/delivery", printJobs.printDelivery);
    server.post("/print/label", printJobs.label);

    // conf
    server.get("/config", config.show);
    server.put("/config", config.update);
    server.get("/config/printers", printInfos.list);
    server.post("/config/reset", config.reset);

    // update
    server.get("/update/latest", update.latest);
    server.get("/update/version", update.versionInfo);
    server.get('/update/check', update.check);

    //logs
    server.get("/logs", logs.get);
    // keep at the end of routes
    server.get(/.*/, restify.serveStatic({
        'directory': 'public',
        'default': 'index.html'
     }));

    server.listen(2000, '0.0.0.0', function () {
        console.log(server.address());
        console.log(`${server.name} running on ${server.url}`);
    });

    server.on("uncaughtException", bugsnag.restifyHandler);
};
