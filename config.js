module.exports = {
    dev: {
        aws: {
            Bucket: 'lpt-commandes',
            subPath: 'paris1'
        },
        printers: {
            invoice: 'intermec',
            label: 'intermec'
        }
    },
    prod: {
        aws: {
            Bucket: 'lpt-commandes',
            subPath: 'paris1'
        }
    }
};
