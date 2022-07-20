const express = require("express");
const router = express.Router();

const tweetCtrl = require("../controllers/tweet");
const { checkToken } = require("../auth/token_validation");

router.get("/", tweetCtrl.getAllTweet);
router.post("/", checkToken, tweetCtrl.postTweet);
router.delete("/:id", checkToken, tweetCtrl.deleteTweet);
router.put("/:id", checkToken, tweetCtrl.patchTweet);

module.exports = router;
