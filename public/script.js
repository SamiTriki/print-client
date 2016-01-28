"use strict";
(function() {
    alertify.defaults.notifier.position = 'top-right';
    ui.btn_certified.addEventListener('click', api.print.certified_label);
    ui.btn_not_certified.addEventListener('click', api.print.not_certified_label);
    ui.btn_reset_config.addEventListener('click', resetConfig);
    ui.btn_update_config.addEventListener('click', updateConfig);

    function showVersion () {
        api.update.version()
        .then(function (version) {
            ui.showVersion(version);
        });
    }

    function update () {
        api.update.latest()
        .then(function (message) {
            showVersion();
        }).catch(console.log('error while updating'));
    }

    function showConfig () {
        api.config.show()
        .then(function (config) {
            ui.showConfig(config);
            conf.current = config;
        });
    }

    function showPrinters () {
        api.config.printers()
        .then(function (printers) {
            ui.showPrinters(printers.join(', ') + '.');
        });
    }

    function resetConfig () {
        api.config.reset()
        .then(function(newConfig) {
            ui.showConfig(newConfig);
            conf.current = newConfig;
            alertify.success('Configuration réinitialisée');
        });
    }

    function updateConfig () {
        ui.setInputValues();
        console.log(conf.current);
        api.config.update(conf.current)
        .then(function(newConfig) {
            ui.showConfig(newConfig);
            conf.current = newConfig;
            alertify.success('Configuration mise à jour');
        });
    }

    showPrinters();
    showVersion();
    showConfig();
})();
