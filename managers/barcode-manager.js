"use strict";
var barcode = require('barcode');
var path = require('path');

var ean_13 = barcode('ean13', {
    data: "012345678910",
    width: 150,
    height: 20
});

var outfile = path.join(__dirname, 'mycode.png');

module.exports = () => {
    return new Promise((resolve, reject) => {
        ean_13.saveImage(outfile, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }

        });
    });
};

