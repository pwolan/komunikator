const { con } = require("../database/config");

module.exports = {
  async find(nick, iduser) {
    const search = nick + "%";
    var sql = `SELECT users.idusers, users.username
    FROM users
    WHERE idusers NOT IN 
    (SELECT friends.friend_id
    FROM friends 
    INNER JOIN users 
    ON friends.user_id = users.idusers 
    WHERE users.idusers=?
    UNION
    SELECT friends.user_id
    FROM friends 
    INNER JOIN users 
    ON friends.friend_id=users.idusers 
    WHERE users.idusers=?)
    AND users.idusers!=? 
    AND users.username LIKE ?
    LIMIT 10`;
    try {
      const result = await con.query(sql, [iduser, iduser, iduser, search]);
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
  async accept(userid, friendid) {
    try {
      var sql = `UPDATE friends SET friends.status = 1 WHERE friends.user_id=? AND friends.friend_id=?`;
      const result = await con.query(sql, [friendid, userid, friendid]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async remove(userid, friendid) {
    try {
      var sql = "DELETE FROM friends WHERE friends.user_id=? AND friends.friend_id=?";
      await con.query(sql, [friendid, userid]);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async view(userid) {
    try {
      var sql = `SELECT users.username, users.idusers, friends.status
      FROM users
      INNER JOIN friends
      ON users.idusers=friends.user_id
      OR (users.idusers=friends.friend_id  AND friends.status=1)
      WHERE idusers IN
      (SELECT friends.friend_id
        FROM friends 
        INNER JOIN users 
        ON friends.user_id = users.idusers 
        WHERE users.idusers=? 
        UNION
        SELECT friends.user_id
        FROM friends 
        INNER JOIN users 
        ON friends.friend_id=users.idusers
        WHERE users.idusers=?)
        AND (friends.user_id=? OR friends.friend_id=?)`;
      const result = await con.query(sql, [userid, userid, userid, userid]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
