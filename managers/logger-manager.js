"use strict";
const fs = require('fs');
var config = require('./configuration-manager').getSync();
var logs_path = `${config.logs_path}/logs.log`;
var requests_path = `${config.logs_path}/requests_logs.log`;

var moment = require('moment');

exports.log = (logs, file, cb) => {
    fs.appendFile(logs_path,
    `${moment().locale('fr').format('DD/MM/YYYY, HH:mm:ss')} | ${logs} [${file}]\n`,
    `utf-8`, (err) => {
        err && console.log(`LOGGER MANAGER ERROR ${err} in ${file}`);
        cb && cb();
    });
};

exports.logRequest = (logs, file, cb) => {
    fs.appendFile(requests_path,
    `${moment().locale('fr').format('DD/MM/YYYY, HH:mm:ss')} | ${logs} [${file}]\n`,
    `utf-8`, (err) => {
        err && console.log(`LOGGER MANAGER ERROR ${err} in ${file}`);
        cb && cb();
    });
};

exports.get = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(logs_path, 'utf-8', function(err, logs) {
                if (err) {reject(err);}
                resolve(format(logs));
            });
        } catch (e) {
            reject(e);
        }
    });
};

exports.reset = () => {
    try {
        let archive = `${config.logs_path}/archived_${Date.now()}.log`;
        fs.createReadStream(logs_path).pipe(fs.createWriteStream(archive));
        fs.unlink(logs_path);
    } catch (e) {
        exports.log(`LOGGING INTERNAL ERROR: Can't delete old logs`);
    }
};

function format (logs) {
    // strips newlines and empty ones
    return logs.split('\n').filter(l => !!l);
}

