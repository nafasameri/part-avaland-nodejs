module.exports = (req, res, next) => {
    req.UserID = 1;
    return req;
}