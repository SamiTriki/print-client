module.exports = {
    aws: {
        Bucket: 'lpt-commandes',
        subPath: 'paris1'
    },
    printers: {
        invoice: 'Brother_MFC-9460CDN',
        label: 'intermec'
    },
    tempFiles: `${__dirname}/../tmp`,
    logs_path: `${__dirname}/../logs`
};
