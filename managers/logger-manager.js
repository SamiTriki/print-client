"use strict";
const fs = require('fs');
var config = require('./configuration-manager').getSync();
var logs_path = `${config.logs_path}logs.log`;
var moment = require('moment');

exports.log = (logs, file) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(logs_path,
            `[${file}]: ${logs} | ${moment().locale('fr').format('DD/MM/YYYY, h:mm:ss')}\n`,
            `utf-8`, (err) => {
            if (err) { reject(err); }
            resolve();
        });
    });
};

exports.get = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(logs_path, 'utf-8', function(err, logs) {
                if (err) {reject(err);}
                resolve(logs);
            });
        } catch (e) {
            reject(e);
        }
    });
};

exports.reset = () => {
    try {
        let archive = `${config.logs_path}archived_${Date.now()}.log`;
        fs.createReadStream(logs_path).pipe(fs.createWriteStream(archive));
        fs.unlink(logs_path);
    } catch (e) {
        exports.log(`LOGGING INTERNAL ERROR: Can't delete old logs`);
    }
};
