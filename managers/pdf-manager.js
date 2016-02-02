//lib to generate a pdf for glasses-verification
"use strict";
const exec = require('child_process').exec;
var barcode = require('./barcode-manager');
const Label = require("../libs/label");
const log = require('./logger-manager').log;
const fs = require('fs');

// generates a certified label
// @param {object} labelInfo: contains the description of the label within the following
// -- @param {string} type: type of label wanted within [certified, not_certified... others to come]
// -- @param {int} order_id
// -- @param {string} customer_name: name of the customer
// -- @param {string} manufacturer_name: name of the manufacturer
// -- @param {string} reason: reason for the problem on manufacturing
// -- @param {string} manufacturing: place where order is made
// -- @param {string} destination: place where to send order
// @return {promise} => path: full path to the generated label

exports.label = (labelInfo) => {
    return new Promise((resolve, reject) => {
        barcode.img(labelInfo.order_id)
        .then((barcode_path) => {
            try {
                let label = new Label(labelInfo, barcode_path);
                label.output()
                .then((pdfLabel) => resolve(pdfLabel));
            } catch (e) {
                log(`Error while instanciating new Label, order: ${labelInfo.order_id}`, __filename);
                reject(e);
            }
        })
        .catch((e) => {
            log(`Error while getting barcode image, ${e}`, __filename);
            reject('error while getting barcode image' + e);
        });
    });
};

// expecially crops pdf from chronopost to get good size for thermal printers
// /!\ executes an external process, "pdfcrop must be installed on the system"
// @param {string} path: path of the directory containing the file
// @param {string} filename: name of the file
// @return {promise} => path: full path to the cropped pdf
exports.crop = (lptDocument) => {
    return new Promise((resolve, reject) => {
        let outputDir = require('./configuration-manager').getSync().tempFiles;
        let rand = Math.floor(Math.random() * 99999999999);
        let delivery_uncropped = `${outputDir}/${rand}_chronopost.pdf`;
        let delivery_cropped = `${outputDir}/${rand}_cropped_chronopost.pdf`;
        fs.writeFile(delivery_uncropped, lptDocument.file, (err) => {
            if (err) { reject(`Could not write file from s3, ${err}`); }
            exec(`pdfcrop ${delivery_uncropped} --margins "-490 -67 0 -62" ${delivery_cropped}`,
            (e, stdout) => outputCropped(e, stdout));
        });

        function outputCropped (err, stdout) {
            if (!err && stdout.includes('written')) {
                fs.readFile(delivery_cropped, function (err, buffer) {
                    if (err) { reject(`Could not read stream from cropped chrono ${err}`); }
                    lptDocument.file = buffer;
                    resolve(lptDocument);
                });
            } else {
                reject(err);
            }
        }
    });
};

