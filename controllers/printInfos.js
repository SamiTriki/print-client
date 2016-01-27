"use strict";

const error = require('restify').errors;
var printer = require('../managers/printer-manager');

exports.list = (req, res, next) => {
    let printersList = printer.printersList();

    if (printersList.length >= 1) {
        res.send(200, printersList);
    } else {
        next(new error.NotFoundError("No printer was found on the local network"));
    }
    next();
};

exports.show = () => printer.show;
exports.index = () => printer.index;
