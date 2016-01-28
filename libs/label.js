"use strict";
const pdf = require('pdfkit');
const moment = require('moment');
const fs = require('fs');

function ConformityLabel (labelInfo, barcode_path) {
    let self = this;
    let outputDir = require('../managers/configuration-manager').get().tempFiles;

    let now = moment().locale('fr').format("lll");

    self.label = new pdf({
        size: [140.00, 140.00],
        layout: 'portrait',
        margins: {
            top:5,
            left:5,
            right:0,
            bottom: 0
        }
    });

    // writes the base comformity label with customer name, order id, barcode and date
    self.label
    .fontSize(10)
    .text(labelInfo.customer_name, {align: "center", ellipsis: true})
    .text(labelInfo.order_id, {align: "center"})
    .image(barcode_path, { fit:[120, 20], align: 'center', x: 10})
    .moveDown(1/3)
    .text(`${now}`, {align: "center"})
    .fontSize(8);

    self.certified = () => {
        self.label
        .text(`par ${labelInfo.manufacturer_name}`, {align: "center"})
        .moveDown(5)
        .text(`montage: ${labelInfo.manufacturing}`, {align: "left"})
        .text(`destination: ${labelInfo.destination}`, {align: "left"});
    };

    self.not_certified = () => {
        self.label
        .text(`NC: ${labelInfo.reason}`, {align: "left"})
        .moveDown(5)
        .text(`par: ${labelInfo.manufacturer_name}`, {align: "left"})
        .text(`montage: ${labelInfo.manufacturing}`, {align: "left"});
    };

    function output () {
        return new Promise((resolve, reject) => {
            let writeStream = fs.createWriteStream(`${outputDir}/${labelInfo.order_id}_label.pdf`);
            writeStream.on('finish', () => resolve(`${outputDir}/${labelInfo.order_id}_label.pdf`));
            writeStream.on('error', (err) => reject(`error while creating label pdf: ${err}`));
            self.label.pipe(writeStream);

            self.label.end();
        });
    }

    if (!self[labelInfo.type]) {throw new Error(`the specified label doesn't exist (yet)`);}

    // calls the according type at construction to write the subsequent infos on the label.
    self[labelInfo.type]();

    // returns the function to get the file path
    return {output};

}

module.exports = ConformityLabel;
