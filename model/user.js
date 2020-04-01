const { con } = require("../database/config");
const bcrypt = require("bcrypt");

module.exports = {
  async register({ mail, password, username, name, surname, birth_date, sex }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verify = await bcrypt.hash((Math.random() * 1000).toFixed(), 10);
      var sql =
        "INSERT INTO users (username, password, name, surname, email, birth_date, sex, verify) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      con.query(sql, [username, hashedPassword, name, surname, mail, birth_date, sex, verify]);
      return verify;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async login(username, password, callback) {
    var sql = "SELECT * FROM users WHERE username = ?";

    try {
      const result = await con.query(sql, [username]);
      if (await bcrypt.compare(password, result[0].password)) {
        delete result[0].password;
        callback(true, result[0]);
      } else {
        callback(false, null);
      }
    } catch (err) {
      console.log("Lost connection or invalid password");
      callback(false, null);
    }
  },
  async promiseLogin(username, password) {
    var sql = "SELECT * FROM users WHERE username = ?";
    try {
      const result = await con.query(sql, [username]);
      if (await bcrypt.compare(password, result[0].password)) {
        delete result[0].password;
        return {
          succes: true,
          user: result
        };
      } else {
        return {
          succes: false,
          user: result
        };
      }
    } catch (err) {
      console.log("Lost connection or invalid password");
      return {
        succes: false,
        user: null
      };
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
