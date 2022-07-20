const connection = require("../db-config");

exports.createUser = async (pseudo, email, password) => {
  let sql = "INSERT INTO User (pseudo, email, password) VALUES (?, ?, ?)";
  await connection.promise().query(sql, [pseudo, email, password]);
  return { pseudo, email, password };
};
