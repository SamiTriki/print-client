"use strict";

var update = require('../managers/update-manager.js');

exports.latest = (req, res, next) => {
    update.latest()
    .then((updated) => {
        if (updated) {
            res.send(200, 'Sucessfully updated');
            next();
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
