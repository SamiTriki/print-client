module.exports = {
    aws: {
        Bucket: 'lpt-commandes',
        subPath: 'paris1'
    },
    printers: {
        invoice: 'invoice_simulator',
        // label: 'intermec'
        label: 'intermec'
    },
    tempFiles: `${__dirname}/tmp`
};
