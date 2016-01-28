"use strict";
(function() {

    ui.btn_certified.addEventListener('click', api.print.certified_label);
    ui.btn_not_certified.addEventListener('click', api.print.not_certified_label);

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

    showVersion();
})();
