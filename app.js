"use strict";
require('dotenv').load();

var printer = require('printer');
var util = require('util');
var path = require('path');
var _ = require('lodash');
var fetch = require('node-fetch');
var request = require('request');
var printers = printer.getPrinters();
var printername = "Simulated_Color_Laser___MacBook_Pro_de_Sami";
var http = require('http');
var aws = require('aws-sdk');
var s3 = new aws.S3();
var template ="N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\"barcode\"\nP0\n";
// let params = {
//     Bucket: 'lpt-commandes',
//     Key: `paris1/105280/commande_fabrication_${105280}.pdf`
// };
let params = {
    Bucket: 'testnidek',
    Key: `test.zpl`
};
s3.getObject(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        printer.printDirect({
            data: data.Body,
            type: 'PDF',
            printer: printername,
            success: (id) => console.log('printed with id ' + id),
            error: (err) => console.error('error on printing: ' + err)
        });
        printZebra(data.Body.toString(), printername);
    }
});

// function printZebra(barcode_text, printer_name){
//     printer.printDirect({data:template.replace(/barcode/, barcode_text)
//         , printer:printer_name
//         , type: "RAW"
//         , success:function(){
//             console.log("printed: "+barcode_text);
//         }
//         , error:function(err){console.log(err);}
//     });
// }

// printer.printDirect({
//     type: 'RAW',
//     data: 'BJR',
//     printer: printername, // printer name, if missing then will print to default printer
//     // , type: 'RAW' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
//     success:function(jobID){
//         console.log("sent to printer with ID: " + jobID);
//     },

//     error:function(err){console.log(err);}
// });

// fs.readFile(filename, function(err, data){
//   if(err) {
//     console.error('err:' + err);
//     return;
//   }
//   console.log('data type is: '+typeof(data) + ', is buffer: ' + Buffer.isBuffer(data));
//     printer.printDirect({
//         data: data,
//         type: 'PDF',
//         printer: printername,
//         success: (id) => console.log('printed with id ' + id),
//         error: (err) => console.error('error on printing: ' + err)
//     });
// });
// fetch(fileUrl)
// .then(res => res.text())
// .then(file => {
//     printer.printDirect({
//         data: file.toString(),
//         type: 'PDF',
//         printer: printername,
//         success: (id) => console.log('printed with id ' + id),
//         error: (err) => console.error('error on printing: ' + err)
//     });
// });
// request.get(fileUrl, (err, res, body) => {
//     // body = new Buffer(body, 'binary');
//     console.log(res);
//     if (!err && res.statusCode == 200) {
//         printer.printDirect({
//             data: body,
//             type: 'PDF',
//             printer: printername,
//             success: (id) => console.log('printed with id ' + id),
//             error: (err) => console.error('error on printing: ' + err)
//         });
//       console.log('data type is: '+typeof(body) + ', is buffer: ' + Buffer.isBuffer(body));

//     }

// });

// http.get(fileUrl)
// .on('response', function (response) {
//     var body = '';
//     var i = 0;
//     response.on('data', function (chunk) {
//         i++;
//         body += chunk;
//         console.log('BODY Part: ' + i);
//     });
//     response.on('end', function () {
//         printer.printDirect({
//             data: body,
//             type: 'PDF',
//             printer: printername,
//             success: (id) => console.log('printed with id ' + id),
//             error: (err) => console.error('error on printing: ' + err)
//         });
//     });
// });
