const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} || ${moment().format('DD/MM/YYYY, HH:mm:ss [GMT:]Z')}`);
    next();
}

module.exports = logger;