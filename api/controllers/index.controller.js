const { successResponse } = require('../helpers/methods')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    res.send(
        successResponse({
            data: 'Test endpoint working well'
        })
    )
}
