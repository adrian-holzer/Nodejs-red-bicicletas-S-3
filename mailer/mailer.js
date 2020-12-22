const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'reuben.ruecker@ethereal.email',
        pass: '6Bujmfn7VfQ5CerB35'
    }
};

module.exports = nodemailer.createTransport(mailConfig);