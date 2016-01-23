"use strict";

var config = require('../config');
const printer = require('printer');
const _ = require('lodash');
var pdf = require('./pdf-manager');
const fs = require('fs');

exports.testCertified = (order_id) => {
    pdf.certified(order_id)
    .then((label_path) => {
        fs.readFile(label_path, function(err, data){
            if(err) {
                console.error('err:' + err);
                return;
            }
            printer.printDirect({
                data: data,
                type: "PDF",
                printer: config.dev.printers.invoice,
                success: (id) => console.log('printed with id', id),
                error: (err) => console.log(err)
            });
        });
    });
};

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

// only returns printers names
exports.printersList = () => {
    let list = [];
    _.forEach(printer.getPrinters(), (printer) => {
        list.push(printer.name);
    });
    return list;
};

exports.testConforme();
// returns jobs and status for a specific printer
exports.show = (name) => printer.getPrinter(name);

exports.index = () => printer.getPrinters();
