const generateSuccessMessage = (message = 'Job created', statusCode = 201) => {
    return { message: message, statusCode: statusCode }

}

module.exports = { generateSuccessMessage };
