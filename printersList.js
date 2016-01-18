"use strict";

var fs = require('fs');
var util = require('util');
var printer = require("printer"),
    _ = require('lodash');

_.forEach(printer.getPrinters(), (printer) => console.log(printer.name));

fs.writeFileSync('./test.js', util.inspect(printer.getPrinters()), 'utf-8');
