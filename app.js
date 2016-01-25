"use strict";
require('dotenv').load();
require('promise.prototype.finally');

var server = require('./server');

server();
