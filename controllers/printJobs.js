"use strict";

var s3 = require('../managers/s3');
var pdf = require('../managers/pdf-manager');
var printer_manager = require('../managers/printer-manager');

exports.printFile = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';

    s3.getOrderDocument(path)
    .then((lptDocument) => {
        printer_manager.file(lptDocument, 'invoice')
        .then(id => {
            res.send(200, id);
            next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.printDelivery = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';

    s3.getOrderDocument(path)
    .then((lptDocument) => {
        pdf.crop(lptDocument)
        .then((croppedDocument) => {
            printer_manager.file(croppedDocument, 'label')
            .then(id => {
                res.send(200, id);
                next();
            })
            .catch((err) => next(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => next(err));
};

exports.label = (req, res, next) => {
    if (!req.body) { next(new Error('You request is empty')); }

    pdf.label(req.body)
    .then((label_path) => {
        printer_manager.label(label_path)
        .then((id) => {
            res.send(200, id);
            next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

