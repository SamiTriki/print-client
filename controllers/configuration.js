"use strict";

const conf = require('../managers/configuration-manager');

exports.reset = (req, res, next) => {
    conf.reset((err, config) => {
        if (err) { next(err); }
        res.send(200, config);
        next();
    });
};

exports.update = (req, res, next) => {
    conf.replace(req.body, (err, config) => {
        if (err) { next(err); }
        res.send(200, config);
        next();
    });
};

exports.show = (req, res, next) => {
    res.send(conf.get());
    next();
};
