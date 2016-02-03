"use strict";

const log = require('./managers/logger-manager').log;

module.exports = () => {
    process.stdin.resume();//so the program will not close instantly
    function exitHandler(options, err) {
        let exitMessage = `Server shutting down`;

        if (err && options.uncaughtException) {
            console.log(`\n${err.stack}`);
            log(`FATAL ERROR, PRINT SERVER SHUT DOWN ${err.stack}`, __filename, process.exit);
        } else {
            console.log(`\n${exitMessage}`);
            log(exitMessage, __filename, process.exit);
        }
    }

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, {uncaughtException: false}));

    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, {uncaughtException: true}));
};
