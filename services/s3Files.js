"use strict";
require('dotenv').load();

var aws = require ('aws-sdk');
var s3 = new aws.s3();
var Promise = require('bluebird');
var config = require('../config');

exports.getOrderDocument = (id, documentName, extension) => {
	return new Promise((resolve, reject) {
		let params = config.prod.aws;
		params.Key = `${params.subPath}/${id}/${documentName}.${extension}`;

		s3.getObject(params, (err, data) => {
			if (err) { reject(err); }
			else { resolve(data.Body); }
		});
	});
}