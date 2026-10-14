const requestLogger = (req, res, next) => {
    const time = new Date().toLocaleTimeString("tr-TR");
    console.log(`[LOG - ${time}] ${req.method} --> ${req.originalUrl}`);
    next();
};

module.exports = requestLogger;
