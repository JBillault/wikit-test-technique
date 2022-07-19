const connection = require("../db-config");
const tweetRepo = require("../repositories/tweet");

exports.getAllTweet = async (req, res) => {
  try {
    const result = await tweetRepo.getAllTweet(req.query.author);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res.send(500).send("Error retrieving data from the database");
  }
};

exports.postTweet = async (req, res) => {
  const { author, content } = req.body;
  try {
    const result = await tweetRepo.postTweet(author, content);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating your tweet", error);
    res.status(500).send("Error creating your tweet");
  }
};

exports.deleteTweet = async (req, res) => {
  const { id } = req.params;
  try {
    await tweetRepo.deleteTweet(id);
    res.status(200).send("Tweet has been successfully deleted");
  } catch (error) {
    console.error("Error deleting your tweet", error);
    res.status(500).send("Error deleting your tweet");
  }
};
