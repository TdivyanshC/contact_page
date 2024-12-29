const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 'Backend error';
    const message = err.message || 'Error from Backend';
    const extraDetails = err.extraDetails || 'Error from Backend';

    return res.status(status).json({message, extraDetails});
};

module.exports = errorMiddleware;