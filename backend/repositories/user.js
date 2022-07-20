const connection = require("../db-config");

exports.createUser = async (pseudo, email, password) => {
  let sql = "INSERT INTO User (pseudo, email, password) VALUES (?, ?, ?)";
  await connection.promise().query(sql, [pseudo, email, password]);
  return { pseudo, email, password };
};

exports.getAllUsers = async () => {
  let sql = "SELECT * FROM User";
  const result = await connection.promise().query(sql, []);
  return result[0];
};

exports.getOneUser = async (id) => {
  let sql = "SELECT * FROM User WHERE id = ?";
  const result = await connection.promise().query(sql, [id]);
  return result[0];
};

exports.deleteUser = async (id) => {
  let sql = "DELETE FROM User WHERE id = ?";
  await connection.promise().query(sql, [id]);
};
