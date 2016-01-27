//lib to generate a pdf for glasses-verification
"use strict";
const exec = require('child_process').exec;
var barcode = require('./barcode-manager');
const Label = require("../libs/label");

// generates a certified label
// @param {object} labelInfo: contains the description of the label withing the following
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
                reject(e);
            }
        })
        .catch((e) => reject('error while getting barcode image' + e));
    });
};

// expecially crops pdf from chronopost to get good size for thermal printers
// /!\ executes an external process, "pdfcrop must be installed on the system"
// @param {string} path: path of the directory containing the file
// @param {string} filename: name of the file
// @return {promise} => path: full path to the cropped pdf
exports.crop = (path, filename) => {
    //TODO: clean file in file manager
    return new Promise((resolve, reject) => {
        exec(`pdfcrop ${path + filename} --margins "-490 -67 0 -62" ${path}cropped_${filename}`,
        (err, stdout) => {
            if (!err && stdout.includes('written')) {
                resolve(`${path}cropped_${filename}`);
            } else {
                reject(err);
            }
        });
    });
};
