"use strict";

var ui = ui || {};
(function(ui){
    ui.btn_certified = document.getElementById('certified');
    ui.btn_not_certified = document.getElementById('not_certified');
    ui.version_info = document.getElementById('version_info');

    ui.showVersion = function (version) {
        version.date && (version.date = new Date(version.date));
        _.forEach(version, function(value, property) {
            document.getElementById('version-' + property) && (document.getElementById('version-' + property).innerHTML = value);
        });
    };
})(ui);
