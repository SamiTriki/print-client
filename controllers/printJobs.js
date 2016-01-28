"use strict";

var s3 = require('../managers/s3');
var pdf = require('../managers/pdf-manager');
var printer = require('../managers/printer-manager');

exports.printFile = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';

    s3.getOrderDocument(path)
    .then((lptDocument) => {
        printer.file(lptDocument)
        .then(id => {
            res.send(id, 200);
            next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.label = (req, res, next) => {
    if (!req.body) { next(new Error('You request is empty')); }

    pdf.label(req.body)
    .then((label_path) => {
        printer.label(label_path)
        .then((id) => {
            res.send(id, 200);
            next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

