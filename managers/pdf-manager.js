//lib to generate a pdf for glasses-verification
"use strict";
var pdf = require('pdfkit');
var fs = require('fs');
var barcode = require('./barcode-manager');
var doc = new pdf({
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

module.exports = () => {
    return new Promise((resolve, reject) => {
        barcode()
        .then(() => {
            let writeStream = fs.createWriteStream('./testpdfkit.pdf');
            writeStream.on('finish', resolve);

            doc.pipe(writeStream);

            doc.text('Sami Triki', {align: "center"});
            doc.text('90304', {align: "center"});
            doc.image('./mycode.png',{fit: [140.00, 140.00]});
            doc.moveDown(1/2);
            doc.text("Le 28/01/1994 à 10:23", {align: "center"});
            doc.end();
        })
        .catch((e) => reject(e));
    });
};

