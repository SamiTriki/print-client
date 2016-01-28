"use strict";

var ui = ui || {};
(function(ui){
    ui.btn_certified = document.getElementById('certified');
    ui.btn_not_certified = document.getElementById('not_certified');
    ui.btn_reset_config = document.getElementById('reset_config');
    ui.btn_update_config = document.getElementById('update_config');
    ui.input_label_printer = document.getElementById('config-label');
    ui.input_invoice_printer = document.getElementById('config-invoice');

    ui.showVersion = function (version) {
        version.date && (version.date = new Date(version.date));
        _.forEach(version, function(value, property) {
            document.getElementById('version-' + property) && (document.getElementById('version-' + property).innerHTML = value);
        });
    };

    ui.showConfig = function (config) {
        _.forEach(config.printers, function(value, property) {
            var elem = document.getElementById('config-' + property);
            elem && (elem.innerHTML = value);
            if (elem.tagName === 'INPUT') { elem.value = value; }
        });
    };

    ui.showPrinters = function (printers) {
        document.getElementById('printers-list') && (document.getElementById('printers-list').innerHTML = printers);
    };

    ui.setInputValues = function () {
        conf.current.printers.label = ui.input_label_printer.value;
        conf.current.printers.invoice = ui.input_invoice_printer.value;
    };
})(ui);
