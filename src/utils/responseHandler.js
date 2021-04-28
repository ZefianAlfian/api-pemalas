/**
 * responseData
 * @param {Object} response response dari express js
 * @param {Number} statusCode status code respon
 * @param {*} values value
 */
const responseData = function (response, statusCode, values) {
    var data = {
        success: true,
        data: values,
    };
    response.status(statusCode).json(data);
    response.end();
};

const responseMessage = function (response, statusCode, message) {
    var data = {
        success: true,
        message: message,
    };
    response.status(statusCode).json(data);
    response.end();
};

module.exports = { responseData, responseMessage };