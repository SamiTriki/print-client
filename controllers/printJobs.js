"use strict";
require('dotenv').load();

var s3 = require('../services/s3files');
var printer = require('../services/printerManager');

exports.printFile = (id, documentName, extension) => {
    return new Promise((resolve, reject) => {
        s3.getOrderDocument(id, documentName, extension)
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
exports.test = () => exports.printFile('105280', 'commande_fabrication_', 'pdf');

