"use strict";
require('dotenv').load();
var s3 = require('./services/s3files');
var printer = require('./services/printerManager');
var template ="N\nS4\nD15\nq400\nR\nB20,10,0,1,2,30,173,B,\"barcode\"\nP0\n";

s3.getOrderDocument('105280', 'commande_fabrication_', 'pdf')
.then((lptDocument) => {
    printer.printFile(lptDocument)
    .then((id) => console.log(`printer successfully with id: ${id}`))
    .catch((err) => console.log('error' + err));
})
.catch((e) => console.log(e));

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
