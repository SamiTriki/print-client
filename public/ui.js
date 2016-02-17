"use strict";

var ui = ui || {};
(function(ui){
    ui.btn_certified = document.getElementById('certified');
    ui.btn_not_certified = document.getElementById('not_certified');
    ui.btn_reset_config = document.getElementById('reset_config');
    ui.btn_update_config = document.getElementById('update_config');
    ui.btn_logs_bottom = document.getElementById('scroll-logs');
    ui.input_label_printer = document.getElementById('config-label');
    ui.input_invoice_printer = document.getElementById('config-invoice');
    ui.input_delivery_printer = document.getElementById('config-delivery');

    ui.printers_list = document.getElementById('printers-list');
    ui.logs = document.getElementById('logs');

    ui.showVersion = function (version) {
        // remove useless text
        version.release_note && (version.release_note = version.release_note.split('(HEAD')[0]);
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
        ui.printers_list.innerHTML = printers;
    };

    ui.setInputValues = function () {
        conf.current.printers.label = ui.input_label_printer.value;
        conf.current.printers.invoice = ui.input_invoice_printer.value;
        conf.current.printers.delivery = ui.input_delivery_printer.value;
    };

    ui.formatLogs = (logs) => {
        let frag = document.createDocumentFragment();
        let li;
        for (let i = 0; i < logs.length; i++) {
            li = document.createElement('li');
            li.innerHTML = '- ' + logs[i];
            frag.appendChild(li);
        }
        ui.logs.appendChild(frag);
    };

    ui.logs_tail = () => ui.logs.scrollTop = ui.logs.scrollHeight;

})(ui);
