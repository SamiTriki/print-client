"use strict";

var printer = require('../services/printerManager');

exports.printersList = () => printer.printersList;
exports.show = () => printer.show;
exports.index = () => printer.index;
