const connection = require("../db-config");
const tweetRepo = require("../repositories/tweet");

exports.getAllTweet = async (req, res) => {
  // let sql = "SELECT * FROM Tweet";
  // const sqlValues = [];
  // if (req.query.author) {
  //   sql += " WHERE author LIKE CONCAT (?, '%')";
  //   sqlValues.push(req.query.author);
  // }
  // sql += " ORDER BY post_date DESC";
  // try {
  //   const result = await connection.promise().query(sql, sqlValues);
  //   // .then(([results]) => {
  //   //   res.status(200).json(results);
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err);
  //   //   res.status(500).send("Error retrieving data from the database");
  //   // });
  //   res.status(200).json(result[0]);
  // } catch (error) {
  //   console.error("Error retrieving data from the database", error);
  //   res.send(500).send("Error retrieving data from the database");
  // }
  try {
    const result = await tweetRepo.getAllTweet(req.query.author);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res.send(500).send("Error retrieving data from the database");
  }
};

exports.postTweet = (req, res) => {
  const { author, content } = req.body;
  connection
    .promise()
    .query("INSERT INTO Tweet (author, content) VALUES (?, ?)", [
      author,
      content,
    ])
    .then(() => {
      res.status(201).send({ author, content });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error creating your tweet");
    });
};

exports.deleteTweet = (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query("DELETE FROM Tweet WHERE id = ?", [id])
    .then(() => {
      res.status(200).send("Tweet has been successfully deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting your tweet");
    });
};
