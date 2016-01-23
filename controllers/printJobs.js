"use strict";
require('dotenv').load();

var s3 = require('../managers/s3');
var pdf = require('../managers/pdf-manager');
var printer = require('../managers/printer-manager');

exports.printFile = (path) => {
    return new Promise((resolve, reject) => {
        s3.getOrderDocument(path)
        .then((lptDocument) => {
            printer.file(lptDocument)
            .then(id => resolve(id))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
};

exports.certified = (order_id) => {
    return new Promise((resolve, reject) => {
        pdf.certified(order_id)
        .then((label_path) => {
            printer.label(label_path)
            .then((id) => resolve(id))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
};

//test
exports.test = () => exports.printFile('paris1/105280/commande_fabrication_105280.pdf');

