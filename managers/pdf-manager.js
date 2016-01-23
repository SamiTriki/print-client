//lib to generate a pdf for glasses-verification
"use strict";
const pdf = require('pdfkit');
const exec = require('child_process').exec;
const del = require('del');
const fs = require('fs');
var barcode = require('./barcode-manager');

exports.certified = (order_id) => {

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

    return new Promise((resolve, reject) => {
        barcode.img(order_id)
        .then((barcode_path) => {

            let writeStream = fs.createWriteStream(`./tmp/${order_id}.pdf`);

            writeStream.on('finish', () => resolve(`./tmp/${order_id}.pdf`));
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
