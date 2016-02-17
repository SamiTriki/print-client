module.exports = {
    aws: {
        Bucket: 'lpt-commandes',
        subPath: 'paris1'
    },
    printers: {
        invoice: 'Brother-MFC-9460CDN',
        label: 'intermec',
        delivery: 'intermec'
    },
    tempFiles: `${__dirname}/../tmp`,
    logs_path: `${__dirname}/../logs`,
    working_directory: `${__dirname}/..`
};
