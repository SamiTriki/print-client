"use strict";
const logger = require('../managers/logger-manager');
const error = require('restify').errors;

exports.get = (req, res, next) => {
    logger.get()
    .then((logs) => {
        res.send(logs);
        next();
    })
    .catch((err) => next(new error.NotFoundError("No logs")));
};
