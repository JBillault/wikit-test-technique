const connection = require("../db-config");

exports.getAllTweet = async (author) => {
  let sql = "SELECT * FROM Tweet";
  const sqlValues = [];
  if (author) {
    sql += " WHERE author LIKE CONCAT (?, '%')";
    sqlValues.push(author);
  }
  sql += " ORDER BY post_date DESC";
  const result = await connection.promise().query(sql, sqlValues);
  return result[0];
};

exports.postTweet = async (author, content) => {
  let sql = "INSERT INTO Tweet (author, content) VALUES (?, ?)";
  await connection.promise().query(sql, [author, content]);
  return { author, content };
};

exports.deleteTweet = async (id) => {
  let sql = "DELETE FROM Tweet WHERE id = ?";
  await connection.promise().query(sql, [id]);
};

exports.patchTweet = async (id, content) => {
  let sql = "UPDATE Tweet SET content = ? WHERE Tweet.id = ?";
  await connection.promise().query(sql, [content, id]);
  return { id, content };
};
