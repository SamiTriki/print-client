"use strict";
require('dotenv').load();
require('./error-handler')();
const log = require('./managers/logger-manager').log;
const bugsnag = require("bugsnag");
bugsnag.register(process.env.BUGSNAG_API_KEY);
var server = require('./server');
server();
log(`Server started`, __filename);
