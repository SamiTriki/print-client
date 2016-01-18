"use strict";
require('dotenv').load();

var s3 = require('../services/s3');
var printer = require('../services/printerManager');

exports.printFile = (path) => {
    return new Promise((resolve, reject) => {
        s3.getOrderDocument(path)
            .then((lptDocument) => {
                printer.printFile(lptDocument)
                .then(id => resolve(id))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
};

// exports.printLabel = () => {
//     return new Promise((resolve, reject) => {
//         s3.getZPL(id)
//         .then((zpl) => {
//             printer.printZPL(zpl);
//         });
//     });
// };

//test
exports.test = () => exports.printFile('paris1/105280/commande_fabrication_105280.pdf');

