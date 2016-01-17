"use strict";
require('dotenv').load();

var aws = require ('aws-sdk');
var s3 = new aws.S3();
var Promise = require('bluebird');
var config = require('../config');

exports.getOrderDocument = (id, documentName, extension) => {
	return new Promise((resolve, reject) => {
		let params = {
			Bucket: config.dev.aws.Bucket,
			Key: `${config.dev.aws.subPath}/${id}/${documentName}${id}.${extension}`
		};

		console.log(params);

		s3.getObject(params, (err, data) => {
			if (err) { reject(err); }
			else { resolve(data.Body); }
		});
	});
}