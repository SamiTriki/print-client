"use strict";
require('dotenv').load();
var printApi = require('./controllers/printJobs');

printApi.test()
.then((id) => console.log(`job ${id} launched successfully`))
.catch(err => console.log(err));
