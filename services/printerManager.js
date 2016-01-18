"use strict";

var config = require('../config');
var printer = require('printer');
var _ = require('lodash');

exports.printFile = (lptDocument) => {
    console.log(lptDocument);
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

exports.printZPL = (barcode_text) => {
    let template ="N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\"barcode\"\nP0\n";

    printer.printDirect({
        data: template.replace(/barcode/, barcode_text),
        printer: config.dev.printers.label,
        type: "RAW",
        success:() => console.log('printer successfully'),
        error: (err) => console.log(err)
    });
};

// only returns printers names
exports.printersList = () => {
    let list = [];
    _.forEach(printer.getPrinters(), (printer) => {
        list.push(printer.name);
    });
    return list;
};

// returns jobs and status for a specific printer
exports.show = (name) => printer.getPrinter(name);

exports.index = () => printer.getPrinters();
