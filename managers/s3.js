"use strict";

const aws = require ('aws-sdk');
const s3 = new aws.S3();

// @param {string} path: full path to the document
// @return {promise} => lptDocument: object containing the file buffer + extension
exports.getOrderDocument = (path) => {
    let config = require('./configuration-manager').get();
    return new Promise((resolve, reject) => {

        // Aws rejects queries with parameters that aren't expected.
        let params = {
            Bucket: config.dev.aws.Bucket,
            Key: path
        };
        s3.getObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    file: data.Body,
                    extension: path.split('.')[path.split('.').length -1]
                });
            }
        });
    });
};
