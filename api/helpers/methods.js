/**
 *
 * @param payload
 * @returns {{package, status: boolean}}
 */
exports.successResponse = (payload) => {
    return {
        status: true,
        payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @returns {{message, status: boolean}}
 */
exports.failResponse = (message, payload = null) => {
    const response = {
        status: false,
        message: message
    }

    if (payload) {
        response.payload = payload
    }

    return response
}
