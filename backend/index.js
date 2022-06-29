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

// FIXING THE CORS PROBLEM
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// GET ALL TWEET FROM ONE AUTHOR OR ALL TWEET
app.get("/tweets/", function (req, res) {
  let sql = "SELECT * FROM Tweet";
  const sqlValues = [];
  const { limit, offset } = req.boby;
  if (req.query.author) {
    sql += " WHERE author LIKE CONCAT (?, '%')";
    sqlValues.push(req.query.author);
  }
  sql += " ORDER BY post_date DESC LIMIT ? OFFSET ?";
  sqlValues.push(limit);
  sqlValues.push(offset);
  // if (req.query.limit) {
  //   sql += " LIMIT ?";
  //   sqlValues.push(req.query.limit);
  // }
  // if (req.query.offset) {
  //   sql += " OFFSET ?";
  //   sqlValues.push(req.query.offset);
  // }
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
