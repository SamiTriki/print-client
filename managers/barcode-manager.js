"use strict";

const barcode = require('barcode');
const path = require('path');

// creates an EAN13 barcore from an order id
// @param {int} order_id: id of the order, has to be converted to string for barcode generation
// @return {promise} => barcode_path: path to the barcode image
exports.img = (order_id) => {
    return new Promise((resolve, reject) => {

        var outfile = path.join(__dirname, `/tmp/${order_id}_barcode.png`);

        let ean_13 = barcode('ean13', {
            data: order_id.toString(),
            width: 150,
            height: 20
        });
        let attempts = 0;
        let saveImage = () => {
            ean_13.saveImage(outfile, function(err) {
                if (err && attempts < 3) {
                    setTimeout(saveImage, 100);
                    attempts++;
                } else if (err && attempts > 3) {
                    reject('error while creating the barcode');
                } else {
                    resolve(outfile);
                }
            });
        };

        saveImage();
    });
};
