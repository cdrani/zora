const fetch = require('node-fetch')
const { successResponse, failResponse } = require('../helpers/methods')

const query = `
    query($ownerAddresses: [String!]) {
        tokens(networks: [{ network: ETHEREUM, chain: MAINNET }],
        where: { ownerAddresses: $ownerAddresses }) {
            nodes {
                token {
                    tokenId
                    metadata
                }
            }
        }
    }
`

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.nft = async (req, res) => {
    const response = await fetch('https://api.zora.co/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: { ownerAddresses: [req.params.address] }
        })
    })
  
    const resJSON = await response.json()

    if (!resJSON.data) {
        const message = 'Address must be a valid address or ENS domain'
        res.send(failResponse(message))
    }

    res.send(successResponse(resJSON.data))
}
