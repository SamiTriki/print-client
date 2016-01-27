"use strict";

var api = api || {};
(function(api){
    api.print = {};
    api.print.certified_label = function () {
        fetch('/print/label', post({
            type: 'certified',
            order_id: 1234567891011,
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        }));
    };

    api.print.not_certified_label = function () {
        fetch('/print/label', post({
            type: 'not_certified',
            order_id: 1234567891011,
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            reason: 'Problème de péniche',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        }));
    };

    function post (object) {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    }
})(api);
