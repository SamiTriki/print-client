"use strict";

var api = api || {};
(function(api){
    api.print = {};

    api.print.certified_label = function () {
        fetch('/print/label', {
            method: 'POST',
            body: JSON.stringify({type: 'certified'})

        });
    };

    api.print.not_certified_label = function () {
        fetch('/print/label', {
            method: 'POST',
            body: JSON.stringify({type: 'not_certified'})
        });
    };

})(api);
