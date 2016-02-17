"use strict";

var api = api || {};
(function(api){
    api.print = {};
    api.update = {};
    api.config = {};

    api.print.certified_label = function () {
        cFetch('/print/label', post({
            type: 'certified',
            order_id: 1234567891011,
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        }))
        .then(() => alertify.success('Impression lancée'))
        .catch((e) => alertify.error('Promblème d\'impression:', e.message));
    };

    api.print.not_certified_label = function () {
        cFetch('/print/label', post({
            type: 'not_certified',
            order_id: 1234567891011,
            customer_name: 'Jean Dupont',
            manufacturer_name: 'Jean-Michel Monteur',
            reason: 'Problème de péniche',
            manufacturing: 'Atelier Paris',
            destination: 'Magasin Paris'
        }))
        .then(() => alertify.success('Impression lancée'))
        .catch((e) => alertify.error('Promblème d\'impression:', e.message));
    };

    api.update.version = function () {
        return cFetch('/update/version')
        .then(function(response) {
            return response.json();
        });
    };

    api.update.check = function () {
        return cFetch('/update/check')
        .then(function(response) {
            return response.json();
        });
    };

    api.update.latest = function () {
        return cFetch('/update/latest')
        .then(function(response) {
            return response.json();
        });
    };

    api.config.show = function () {
        return cFetch('/config')
        .then(function(response) {
            return response.json();
        });
    };

    api.config.printers = function () {
        return cFetch('/config/printers')
        .then(function(response) {
            return response.json();
        });
    };

    api.config.update = function (config) {
        return cFetch('/config', put(config))
        .then(function(response) {
            return response.json();
        });
    };

    api.config.reset = function () {
        return cFetch('/config/reset', post({}))
        .then(function(response) {
            return response.json();
        });
    };

    api.logs = function () {
        return cFetch('/logs')
        .then(function(response) {
            return response.json();
        })
        .catch(function (response) {
            throw new Error('Pas de logs');
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
    //custom fetch to reject 404 https://github.com/github/fetch/issues/155

    function cFetch(url, options) {
        if (!options) {options = {}; }
        if (!options.credentials) { options.credentials = 'same-origin'; }
        return fetch(url, options).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                var error = new Error(response.statusText || response.status || response.message);
                error.response = response;
                return Promise.reject(error);
            }
        });
    }
})(api);
