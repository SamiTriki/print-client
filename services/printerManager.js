"use strict";

var config = require('../config');
var printer = require('printer');

exports.printFile = (lptDocument) => {
    return new Promise((resolve, reject) => {
        printer.printDirect({
            data: lptDocument.file,
            type: lptDocument.extension.toUpperCase(),
            printer: config.dev.printers.invoice,
            success: (id) => resolve(id),
            error: (err) => reject(err)
        });
    });
};

exports.printersList = () => printer.getPrinters();
