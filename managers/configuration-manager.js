"use strict";

var config_file_path = `${__dirname}/../config/config.json`;
const default_config = require('../config/default_config');

var fs = require('fs');

exports.set = (type, prop, value, cb) => {
    let config = exports.get();
    if (config[type] && config[type][prop]) {
        config[type][prop] = value;
    } else if (config[type]) {
        config[type] = value;
    } else {
        throw new Error(`Can't find your property in the config file`);
    }
    save(config, () => cb());
};

exports.replace = (newConfig, cb) => {
    try {
        save(newConfig, () => cb(null, newConfig));
    } catch (e) {
        cb(e);
    }
};

exports.get = (cb) => {
    try {
        // if file exists.
        cb(JSON.parse(fs.readFileSync(config_file_path)));
    } catch (e) {
        // if no config file, save and return default
        save(default_config,() => {
            cb(default_config);
        });
    }
};

exports.reset = (cb) => {
    try {
        exports.replace(default_config, () => cb(null, default_config));
    } catch (e) {
        cb(e);
    }
};

function save (config, cb) {
    fs.writeFile(config_file_path, JSON.stringify(config), (err) => {
        if (err) { throw new Error('Failed to write config file'); }
        cb();
    });
}
