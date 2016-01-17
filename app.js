"use strict";
require('dotenv').load();
var s3 = require('./services/s3files');
var printer = require('printer');
var util = require('util');
var _ = require('lodash');
var printers = printer.getPrinters();
var printername = "Simulated_Color_Laser___MacBook_Pro_de_Sami";
var template ="N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\"barcode\"\nP0\n";

s3.getOrderDocument('105280', 'commande_fabrication_', 'pdf')
.then((file) => {
    printer.printDirect({
        data: file,
        type: 'PDF',
        printer: printername,
        success: (id) => console.log('printed with id ' + id),
        error: (err) => console.error('error on printing: ' + err)
    });
})
.catch(console.log('error when trying to get file'));

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