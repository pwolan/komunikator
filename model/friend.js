const { con } = require("../database/config");

module.exports = {
  async find(nick, iduser) {
    const search = nick + "%";
    var sql = `SELECT users.username, users.idusers 
    FROM users 
    LEFT JOIN friends 
    ON users.idusers=friends.friend_id 
    WHERE users.username LIKE ? AND friends.friend_id IS NULL 
    AND users.idusers!=? 
    LIMIT 10`;
    try {
      const result = await con.query(sql, [search, iduser]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async add(userid, friendid) {
    try {
      var sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";
      await con.query(sql, [userid, friendid]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async accept() {},
  async remove() {},
  async view(userid) {
    try {
      var sql = `SELECT users.username, friends.idfriends, friends.status 
      FROM friends  
      INNER JOIN users  
      ON friends.friend_id = users.idusers 
      WHERE friends.user_id = ?`;
      const result = await con.query(sql, userid);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
