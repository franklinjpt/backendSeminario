success = function (req, res, body, status, message){
    res.status(status || 200).send({
        message: message,
        error: '',
        body: body
    });
}
error = function (req, res, message, status, details){
    console.error((`[response error] ${details}`));
    res.status(status || 500).send({
        error: message,
        body: ''
    })
}

module.exports = {
    success,
    error
}