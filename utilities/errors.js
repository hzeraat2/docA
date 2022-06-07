const generateErrorMessage = (message = 'Generic error', statusCode = 400) => {
    return { error: message, statusCode: statusCode }

}

module.exports = { generateErrorMessage };
