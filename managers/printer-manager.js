"use strict";

var config = require('../config');
const printer = require('printer');
const _ = require('lodash');
const fs = require('fs');

// Prints from a file buffer
// @param {object} lptDocument - {file: file_bugger, extension: string}
// @return {promise} => id of the current job
exports.file = (lptDocument) => {
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

// Prints from a self generated label
// @param {string} label_path: full path to the generated file
// @return {promise} => id of the current job
exports.label = (label_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(label_path, function(err, data){
            if(err) {
                console.error('err:' + err);
                return;
            }
            printer.printDirect({
                data: data,
                type: "PDF",
                printer: config.dev.printers.label,
                success: (id) => resolve(id),
                error: (err) => reject(err)
            });
        });
    });
};

// @return {array} - contains printers list as strings
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
