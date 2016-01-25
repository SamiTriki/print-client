"use strict";

const del = require('del');

exports.labelClean = (order_id) => {
    del(`./tmp/${order_id}_label.pdf`);
    del(`./tmp/${order_id}_barcode.png`);
};
