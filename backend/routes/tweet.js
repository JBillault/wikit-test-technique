const express = require("express");
const router = express.Router();

const tweetCtrl = require("../controllers/tweet");

router.get("/", tweetCtrl.getAllTweet);
router.post("/", tweetCtrl.postTweet);
router.delete("/:id", tweetCtrl.deleteTweet);

module.exports = router;
