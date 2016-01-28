"use strict";

var api = api || {};
(function(api){
    api.print = {};
    api.update = {};
    api.config = {};

    api.print.certified_label = function () {
        fetch('/print/label', post({
            type: 'certified',
            order_id: 1234567891011,
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        }))
        .then(alertify.success('Impression lancée'));
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
        }))
        .then(alertify.success('Impression lancée'));
    };

    api.update.version = function () {
        return fetch('/update/version')
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.update.check = function () {
        return fetch('/update/check')
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.update.latest = function () {
        return fetch('/update/latest')
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.config.show = function () {
        return fetch('/config')
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.config.printers = function () {
        return fetch('/config/printers')
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.config.update = function (config) {
        return fetch('/config', put(config))
        .then(function(requestPromise) {
            return requestPromise.json();
        });
    };

    api.config.reset = function () {
        return fetch('/config/reset', post({}))
        .then(function(requestPromise) {
            return requestPromise.json();
        });
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

    function put (object) {
        return {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    }
})(api);
