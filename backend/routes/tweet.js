const express = require("express");
const router = express.Router();

const tweetCtrl = require("../controllers/tweet");
const { checkToken } = require("../auth/token_validation");

router.get("/", checkToken, tweetCtrl.getAllTweet);
router.post("/", checkToken, tweetCtrl.postTweet);
router.delete("/:id", checkToken, tweetCtrl.deleteTweet);
router.patch("/:id", checkToken, tweetCtrl.patchTweet);

module.exports = router;
