"use strict";
require('dotenv').load();
const log = require('./managers/logger-manager').log;
var server = require('./server');
server();

log(`Server started`, __filename);
