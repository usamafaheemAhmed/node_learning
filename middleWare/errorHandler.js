

let { logEvents } = require('./logEvents');


const errorHandler = (err, req, res, next) => {

    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Extract the operating system and browser information

    // const osAndBrowser = userAgent.match(/\((.*?)\)/)[1];

    logEvents(`${req.method}\t${clientIP}\t${userAgent}\t${req.url}`, `errorlog.txt`);

    // logEvents(`${req.method}\t${req.url}`, `error.txt`)
    console.log(err.stack);
    res.status(500).send(err.message);
    next()
}



module.exports = errorHandler;