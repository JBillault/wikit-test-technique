require("dotenv").config();
const connection = require("./db-config");
const app = require('./app');

const port = process.env.PORT ?? 3001;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected to database with threadId: " + connection.threadId);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
