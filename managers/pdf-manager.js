//lib to generate a pdf for glasses-verification
"use strict";
const pdf = require('pdfkit');
const exec = require('child_process').exec;
const fs = require('fs');
const moment = require('moment');
var barcode = require('./barcode-manager');

// generates a certified label
// @param {int} order_id
// @param {string} first_name: first name of the customer
// @param {string} last_name: last name of the customer
// @param {string} user: name of the operator
// @return {promise} => path: full path to the generated label
exports.certified = (order_id, first_name, last_name, user) => {
    return new Promise((resolve, reject) => {
        barcode.img(order_id)
        .then((barcode_path) => {
            let doc = new pdf({
                size: [140.00, 140.00],
                layout: 'portrait',
                margins: {
                    top:43,
                    left:0,
                    right:0,
                    bottom: 0
                }
            });
            let now = moment().locale('fr').format("lll");
            let writeStream = fs.createWriteStream(`${__dirname}/tmp/${order_id}_label.pdf`);

            writeStream.on('finish', () => resolve(`${__dirname}/tmp/${order_id}_label.pdf`));
            writeStream.on('error', (err) => reject(`error while creating label pdf: ${err}`));

            doc.fontSize(10)
            .text(`${first_name} ${last_name}`, {align: "center", ellipsis: true})
            .text(order_id, {align: "center"})
            .image(barcode_path, {fit: [140.00, 140.00]})
            .moveDown(1/3)
            .text(`${now}`, {align: "center"})
            .fontSize(8)
            .text(`par ${user}`, {align: "center"})
            .end();

            doc.pipe(writeStream);

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
