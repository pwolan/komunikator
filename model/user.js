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
  login(username, password) {
    var sql = "SELECT * FROM users WHERE username = ?";
    con.query(sql, [username], function(err, result) {
      if (err) {
        throw err;
      }
      if (result > 0) {
        if (result[0].password == password) {
          return { succes: true, user: result[0] };
        } else {
          return { succes: false, user: null };
        }
      } else {
        return { succes: false, user: null };
      }
    });
  }
};
