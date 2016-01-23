"use strict";

const barcode = require('barcode');
const path = require('path');

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

