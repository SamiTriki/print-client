"use strict";
require('dotenv').load();
require('./error-handler')();
const log = require('./managers/logger-manager').log;
var server = require('./server');
server();

log(`Server started`, __filename);
