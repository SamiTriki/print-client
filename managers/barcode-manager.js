"use strict";

const barcode = require('rescode');
const fs = require('fs');

// creates an EAN13 barcore from an order id
// @param {int} order_id: id of the order, has to be converted to string for barcode generation
// @return {promise} => barcode_path: path to the barcode image
exports.img = (order_id) => {
    let outputDir = require('./configuration-manager').getSync().tempFiles;
    return new Promise((resolve, reject) => {
        let outfile = `${outputDir}/${order_id}_barcode.png`;
        try {
            // Sequence is important
            barcode.loadModules(["ean2", "ean5", "ean8", "ean13"], {"includetext": false, "scaleX":5});
        } catch (e) {
            reject(`Barcode library error`);
        }

        let image = barcode.create("ean13", order_id.toString());

        fs.writeFile(outfile, image, (err) => {
            if (err) {reject(`error while writing barcode to disk ${err}`);}
            resolve(outfile);
        });
    });
};
