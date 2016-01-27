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
    // nodejs doesn't support default parameters yet
    let order_id = req.query.order_id || 1234567891011;
    let first_name = req.query.first_name || 'Jean';
    let last_name = req.query.last_name || 'Dupont';
    let user = req.query.user || 'Prosper';
    let reason = req.query.raison || 'Problème de péniche';
    let type = req.query.type || 'not_certified';
    let manufacturing = req.query.manufacturing || 'Atelier Paris';
    let destination = req.query.destination || 'Magasin Paris';

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

