"use strict";

const barcode = require('barcode');
const path = require('path');

// creates an EAN13 barcore from an order id
// @param {int} order_id: id of the order
// @return {promise} => barcode_path: path to the barcode image
exports.img = (order_id) => {

    var outfile = path.join(__dirname, `/tmp/${order_id}.png`);

    let ean_13 = barcode('ean13', {
        data: order_id,
        width: 150,
        height: 20
    });
    return new Promise((resolve, reject) => {
        ean_13.saveImage(outfile, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(`/tmp/${order_id}.png`);
            }
        });
    });
};

