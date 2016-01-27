"use strict";

var s3 = require('../managers/s3');
var pdf = require('../managers/pdf-manager');
var printer = require('../managers/printer-manager');

exports.printFile = (req, res, next) => {
    let path = req.body && req.body.path || 'paris1/105280/commande_fabrication_105280.pdf';
    console.log(path);

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
    if (!req.body) {next(new Error('You request needs a body'));}
    // nodejs doesn't support default parameters yet
    req.body = JSON.parse(req.body);
    let order_id = req.body.order_id || 1234567891011;
    let first_name = req.body.first_name || 'Jean';
    let last_name = req.body.last_name || 'Dupont';
    let user = req.body.user || 'Prosper';
    let reason = req.body.raison || 'Problème de péniche';
    let type = req.body.type || 'not_certified';
    let manufacturing = req.body.manufacturing || 'Atelier Paris';
    let destination = req.body.destination || 'Magasin Paris';

    pdf.label({order_id, first_name, last_name, user, type, reason, destination, manufacturing})
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

