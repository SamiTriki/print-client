"use strict";

var config = require('../config');
var printer = require('printer');
var _ = require('lodash');
var pdf = require('./pdf-manager');
var fs = require('fs');
var path = require('path');

var filename = "./testpdfkit.pdf";
filename = path.resolve(process.cwd(), filename);
exports.testConforme = () => {
    pdf()
    .then(() => {
        fs.readFile(filename, function(err, data){
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

exports.printZPL = (barcode_text) => {
    let template ="${N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\"barcode\"\nP0\n}$";
    barcode_text = "^XA^FX Top section with company logo, name and address.^CF0,60^FO50,50^GB100,100,100^FS^FO75,75^FR^GB100,100,100^FS^FO88,88^GB50,50,50^FS^FO220,50^FDInternational Shipping, Inc.^FS^CF0,40^FO220,100^FD1000 Shipping Lane^FS^FO220,135^FDShelbyville TN 38102^FS^FO220,170^FDUnited States (USA)^FS^FO50,250^GB700,1,3^FS^FX Second section with recipient address and permit information.^CFA,30^FO50,300^FDJohn Doe^FS^FO50,340^FD100 Main Street^FS^FO50,380^FDSpringfield TN 39021^FS^FO50,420^FDUnited States (USA)^FS^CFA,15^FO600,300^GB150,150,3^FS^FO638,340^FDPermit^FS^FO638,390^FD123456^FS^FO50,500^GB700,1,3^FS^FX Third section with barcode.^BY5,2,270^FO175,550^BC^FD1234567890^FS^FX Fourth section (the two boxes on the bottom).^FO50,900^GB700,250,3^FS^FO400,900^GB1,250,3^FS^CF0,40^FO100,960^FDShipping Ctr. X34B-1^FS^FO100,1010^FDREF1 F00B47^FS^FO100,1060^FDREF2 BL4H8^FS^CF0,190^FO485,965^FDCA^FS^XZ";
    console.log(template.replace(/barcode/, barcode_text));

    printer.printDirect({
        data: template.replace(/barcode/, barcode_text),
        printer: config.dev.printers.label,
        type: "RAW",
        success:() => console.log('printed successfully'),
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

exports.testConforme();
// returns jobs and status for a specific printer
exports.show = (name) => printer.getPrinter(name);

exports.index = () => printer.getPrinters();
