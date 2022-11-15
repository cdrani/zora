const express = require("express")
const router = express.Router()

const NFTController = require("../controllers/nft.controller")

router.get("/:address", NFTController.nft)

module.exports = router