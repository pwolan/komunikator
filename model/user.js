const { con } = require("../database/config");

module.exports = {
  register({ mail, password, username, name, surname, birth_date, sex }) {
    var sql =
      "INSERT INTO users (username, password, name, surname, email, birth_date, sex) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.query(sql, [username, password, name, surname, mail, birth_date, sex], function(error) {
      if (error) {
        throw error;
      }
    });
  },
  async login(username, password, callback) {
    var sql = "SELECT * FROM users WHERE username = ?";

    try {
      const result = await con.query(sql, [username]);
      if (result[0].password == password) {
        delete result[0].password;
        callback(true, result[0]);
      } else {
        callback(false, null);
      }
    } catch (err) {
      console.log(err);
      callback(false, null);
    }
  },
  async isMailExist(mail) {
    let sql = `
      SELECT email FROM users
      WHERE email=?
    `;
    try {
      const result = await con.query(sql, [mail]);
      return result.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
