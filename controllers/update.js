"use strict";

var update = require('../managers/update-manager.js');
const exec = require('child_process').exec;
const log = require('./logger-manager').log;

exports.latest = (req, res, next) => {
    update.latest()
    .then((updated) => {
        if (updated) {
            const working_directory = require('../managers/configuration-manager').getSync().working_directory;
            res.send(200, 'Sucessfully updated');
            exec(`cd ${working_directory} && npm start`, (err, stdout, stderr) => {
                log(stdout, __filename);
                if (err || stderr) {
                    let msg = err || stderr;
                    log(msg, __filename);

                    next(msg);
                } else {
                    next();
                }
            });

        } else {
            res.send(202, 'No updates available');
            next();
        }
    }).catch(err => next(err));
};

exports.versionInfo = (req, res, next) => {
    update.getStatus()
    .then((version) => {
        if (!version) {
            res.send(404, new Error('No version information found'));
            next();
        } else {
            res.send(version);
            next();
        }
    }).catch(err => next(err));
};

exports.check = (req, res, next) => {
    update.check()
    .then((shouldUpdate) => {
        res.send({shouldUpdate});
        next();
    }).catch(err => next(err));
};
