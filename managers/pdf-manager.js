//lib to generate a pdf for glasses-verification
"use strict";
const pdf = require('pdfkit');
const exec = require('child_process').exec;
const del = require('del');
const fs = require('fs');
var barcode = require('./barcode-manager');

// generates a certified label
// @param {int} order_id
// @param {string} first_name: first name of the customer
// @param {string} last_name: last name of the customer
// @param {string} user: name of the operator
// @return {promise} => path: full path to the generated label
exports.certified = (order_id) => {
    return new Promise((resolve, reject) => {
        let doc = new pdf({
            size: [140.00, 140.00],
            layout: 'portrait',
            margins: {
                top:50,
                left:5,
                right:5,
                bottom:5
            },
            fontSize: 8
        });

        barcode.img(order_id)
        .then((barcode_path) => {

            let writeStream = fs.createWriteStream(`./tmp/${order_id}_label.pdf`);

            writeStream.on('finish', () => resolve(`./tmp/${order_id}_label.pdf`));
            doc.pipe(writeStream);

            doc.text('Sami Triki', {align: "center"});
            doc.text('90304', {align: "center"});
            doc.image(barcode_path, {fit: [140.00, 140.00]});
            doc.moveDown(1/2);
            doc.text("Le 28/01/1994 à 10:23", {align: "center"});
            doc.end();
        })
        .catch((e) => reject(e));
    });
};

// expecially crops pdf from chronopost to get good size for thermal printers
// /!\ executes an external process, "pdfcrop must be installed on the system"
// @param {string} path: path of the directory containing the file
// @param {string} filename: name of the file
// @return {primise} => path: full path to the cropped pdf
exports.crop = (path, filename) => {
    return new Promise((resolve, reject) => {
        exec(`pdfcrop ${path + filename} --margins "-490 -67 0 -62" ${path}cropped_${filename}`,
        (err, stdout) => {
            if (!err && stdout.includes('written')) {
                del(path + filename);
                resolve(`${path}cropped_${filename}`);
            } else {
                reject(err);
            }
        });
    });
};
