"use strict";

var scissors = require('scissors');
var fs = require('fs');
var filename = "./chronoposttomodify.pdf";
let left = 500, bottom = 490, right = 500, top = 1000;

var pdf = scissors(filename)
    .crop(left,bottom, right, top);
//1 plus large. 2: jss ap
pdf.pdfStream().pipe(fs.createWriteStream(`./xmodified_l${left}b${bottom}r${right}t${top}.pdf`));

