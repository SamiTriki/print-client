"use strict";

var config_file_path = `${__dirname}/../config/config.json`;
const default_config = require('../config/default_config');

var fs = require('fs');

exports.set = (type, prop, value, cb) => {
    let config = exports.getSync();
    if (config[type] && config[type][prop]) {
        config[type][prop] = value;
    } else if (config[type]) {
        config[type] = value;
    } else {
        throw new Error(`Can't find your property in the config file`);
    }
    save(config, () => cb && cb());
};

exports.replace = (newConfig, cb) => {
    try {
        save(newConfig, () => cb && cb(null, newConfig));
    } catch (e) {
        cb && cb(e);
    }
};

exports.get = (cb) => {
    try {
        fs.readFile(config_file_path, 'utf-8', (err, file) => {
            if (err) { throw new Error(`Failed to read config file, ${err}`); }
            cb && cb(JSON.parse(file));
        });
    } catch (e) {
        // if no config file, save and return default
        save(default_config,() => {
            cb && cb(default_config);
        });
    }
};

exports.getSync = () => {
    try {
        return JSON.parse(fs.readFileSync(config_file_path));
    } catch (e) {
        save(default_config);
        return default_config;
    }
};

exports.reset = (cb) => {
    try {
        exports.replace(default_config, () => cb && cb(null, default_config));
    } catch (e) {
        cb && cb(e);
    }
};

function save (config, cb) {
    fs.writeFile(config_file_path, JSON.stringify(config), (err) => {
            if (err) { throw new Error(`Failed to write config file, ${err}`); }
        cb && cb();
    });
}

// reset configuration from cli in case of problem
if (process.argv.indexOf('reset') > -1) {
    exports.reset(() => {
        console.log('Resetting configuration');
    });
}

