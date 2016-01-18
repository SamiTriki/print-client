"use strict";

var aws = require ('aws-sdk');
var s3 = new aws.S3();
var config = require('../config');

exports.getOrderDocument = (path) => {
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

// exports.getZPL = (id) => {
//     return new Promise((resolve, reject) => {
//         let params = {
//             Bucket: config.dev.aws.Bucket,
//             Key: `${config.dev.aws.subPath}/${id}/${documentName}${id}.${extension}`
//         };
//     });
// };
