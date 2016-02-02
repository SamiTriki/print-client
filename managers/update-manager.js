"use strict";
var fs = require('fs');
const log = require('./logger-manager').log;
fs.writeFileSync(`${process.env.HOME}/.netrc`, `machine api.github.com\nlogin lpt-self-update\npassword ${process.env.GITHUB_BOT_PASS}
    machine github.com\nlogin lpt-self-update\npassword ${process.env.GITHUB_BOT_PASS}`);

var git = require('simple-git')( `${__dirname}/..` );

exports.latest = () => {
    return new Promise((resolve, reject) => {
        git.pull(function(err, update) {
            if (err) {
                log(`Error while fetching latest data from github`, __filename);
                reject(err);
            }
            let updated;

            if(update && update.summary.changes) {
                updated = true;
                // TODO: RESTART LOGIC HERE FOR PRODUCTION
                resolve(updated);
            } else {
                updated = false;
                resolve(updated);
            }
        });
    });
};

exports.getStatus = () => {
    return new Promise((resolve, reject) => {
        git.log((err, logs) => {
            if (err) {
                log(`Error while logging github info`, __filename);
                reject(err);
            }

            if (logs && logs.latest) {
                resolve({
                    version: logs.latest.hash && logs.latest.hash.replace("'","").trim(),
                    date: new Date(logs.latest.date) || logs.latest.date,
                    release_note: logs.latest.message,
                    author: logs.latest.author_name,
                    total_releases: logs.total
                });
            } else {
                resolve();
            }

        });
    });
};

exports.check = () => {
    return new Promise((resolve, reject) => {
        try {

            let checkStatus = () => {
                exports.getStatus()
                .then((status) => {
                    require('child_process').exec('git log -n 1 origin/master', (err, t) => {
                        if (err) { reject(err); }
                        // check if remote last commit and local one matches
                        resolve((status.version !== t.split(" ")[1].replace('\nAuthor:', '').trim()));
                    });
                });
            };

            git.fetch(() => checkStatus());
        } catch (e) {
            log(`Could not check the github status update`, __filename);
            reject(new Error(`Could not check the status update`));
        }
    });
};

exports.history = () => {
    return new Promise((resolve, reject) => {
        git.log((err, logs) => {
            if (err) {
                log(`Error while logging github info`, __filename);
                reject(err);
            }

            if (logs && logs.latest) {
                resolve({
                    version: logs.latest.hash && logs.latest.hash.replace("'","").trim(),
                    date: new Date(logs.latest.date) || logs.latest.date,
                    release_note: logs.latest.message,
                    author: logs.latest.author_name,
                    total_releases: logs.total
                });
            } else {
                resolve();
            }

        });
    });
};
