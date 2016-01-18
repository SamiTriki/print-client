module.exports = {
    dev: {
        aws: {
            Bucket: 'lpt-commandes',
            subPath: 'paris1'
        },
        printers: {
            invoice: 'Simulated_Color_Laser___sami_mbp',
            label: 'Simulated_Label_Printer___sami_mbp'
        }
    },
    prod: {
        aws: {
            Bucket: 'lpt-commandes',
            subPath: 'paris1'
        }
    }
};
