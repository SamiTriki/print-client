"use strict";

var s3 = require('../managers/s3');
var pdf = require('../managers/pdf-manager');
var printer_manager = require('../managers/printer-manager');
const log = require('../managers/logger-manager').log;

exports.printFile = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';
    log(`Printing file ${path}`, __filename);

    s3.getOrderDocument(path)
    .then((lptDocument) => {
        printer_manager.file(lptDocument, 'invoice')
        .then(id => {
            log(`File ${path} printing sent with job id ${id}`, __filename);
            res.send(200, id);
            next();
        })
        .catch((err) => {
            log( `Failed to send job [${path}] to printer: {err}`,__filename);
            next(err);
        });
    })
    .catch((err) => {
        log( `Failed get document [${path}] from remote storage: ${err}`,__filename);
        next(err);
    });
};

exports.printDelivery = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';
    log(`Printing delivery file ${path}`, __filename);

    s3.getOrderDocument(path)
    .then((lptDocument) => {
        pdf.crop(lptDocument)
        .then((croppedDocument) => {
            printer_manager.file(croppedDocument, 'label')
            .then(id => {
                log(`Delivery file ${path} printing sent with job id ${id}`, __filename);
                res.send(200, id);
                next();
            })
            .catch((err) => {
                log( `Failed to send job [${path}] to printer: ${err}`,__filename);
                next(err);
            });
        })
        .catch((err) => {
            log( `Failed crop document [${path}]: ${err}`,__filename);
            next(err);
        });
    })
    .catch((err) => {
        log( `Failed get document [${path}] from remote storage: ${err}`,__filename);
        next(err);
    });
};

exports.label = (req, res, next) => {
    if (!req.body) { next(new Error('You request is empty')); }
    log(`Printing ${req.body.type || '[NO TYPE]'} label ${req.body.order_id || 'NO LABEL INFO'}`, __filename);

    pdf.label(req.body)
    .then((label_path) => {
        printer_manager.label(label_path)
        .then((id) => {
            log(`${req.body.type || '[NO TYPE]'} label ${req.body.order_id || 'NO LABEL INFO'} printing send with job id ${id}`, __filename);
            res.send(200, id);
            next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

