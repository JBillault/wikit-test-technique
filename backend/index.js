require("dotenv").config();
const connection = require("./db-config");
const express = require("express");
const app = express();

const port = process.env.PORT ?? 3001;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected to database with threadId: " + connection.threadId);
  }
});

app.use(express.json());

// GET ALL TWEET FROM ONE AUTHOR OR ALL TWEET
app.get("/tweets/", function (req, res) {
  let sql = "SELECT * FROM Tweet";
  const sqlValues = [];
  if (req.query.author) {
    sql += " WHERE author = ?";
    sqlValues.push(req.query.author);
  }
  connection
    .promise()
    .query(sql, sqlValues)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
});

// POST A TWEET
app.post("/tweets", function (req, res) {
  const { author, content, date } = req.body;
  connection
    .promise()
    .query("INSERT INTO Tweet (author, content, date) VALUES (?, ?, ?)", [
      author,
      content,
      date,
    ])
    .then(() => {
      res.status(201).send({ author, content, date });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error creating your tweet");
    });
});

// DELETE A TWEET
app.delete("/tweets/:id", function (req, res) {
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
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
