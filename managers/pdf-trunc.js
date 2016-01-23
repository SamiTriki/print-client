"use strict";

const exec = require('child_process').exec;
const del = require('del');

// crops a file, deletes it and returns the new file
exports.crop = (path, filename) => {
    return new Promise((resolve, reject) => {
        exec(`pdfcrop ${path + filename} --margins "-490 -67 0 -62" ${path}cropped_${filename}`,
        (err, stdout) => {
            if (!err && stdout.includes('written')) {
                del(path + filename);
                resolve(`${path}cropped_${filename}`);
            } else {
                del(path + filename);
                reject(err);
            }
        });
    });
};
