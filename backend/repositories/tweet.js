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
