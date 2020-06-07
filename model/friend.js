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
    LIMIT 20`;
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
      const result = await con.query(sql, [friendid, userid]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async new(userid, friendid) {
    try {
      var sql = `SELECT users.idusers, users.username, users.avatar, userInRoom.roomid
    FROM users
    INNER JOIN userInRoom
    WHERE roomid IN
    (SELECT a.roomid
    FROM userInRoom AS a
    INNER JOIN userInRoom AS b
    ON a.roomid = b.roomid
    WHERE a.userid=?
    AND b.userid=?)
    AND users.idusers=?
    GROUP BY users.username`;
      const result = await con.query(sql, [userid, friendid, userid]);
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
      var sql = `SELECT DISTINCT tab.username, tab.idusers, tab.status, max(tab.roomid) AS roomid
      FROM(
      SELECT users.username, users.idusers, friends.status, userInRoom.roomid
            FROM users
            INNER JOIN friends
            ON users.idusers=friends.user_id
            OR (users.idusers=friends.friend_id AND friends.status=1)
            LEFT JOIN userInRoom
            ON users.idusers=userInRoom.userid
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
              AND (friends.user_id=? OR friends.friend_id=?)
              AND IF(friends.status=1,roomid IN 
                (SELECT a.roomid
                FROM userInRoom AS a
                INNER JOIN userInRoom AS b
                ON a.roomid = b.roomid
                WHERE a.userid=users.idusers
                AND b.userid=?),NULL)
          UNION 
              SELECT users.username, users.idusers, friends.status, NULL
            FROM users
            INNER JOIN friends
            ON users.idusers=friends.user_id
            OR (users.idusers=friends.friend_id AND friends.status=1)
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
            AND (friends.user_id=? OR friends.friend_id=?)) AS tab
                  GROUP BY tab.username`;
      const result = await con.query(sql, [
        userid,
        userid,
        userid,
        userid,
        userid,
        userid,
        userid,
        userid,
        userid,
      ]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async viewOne(idusers, friendid) {
    //TODO  tylko jeden wynik,
    //  odwrócone idu bo dane idą do frienda zamiast usera
    try {
      var sql = `SELECT DISTINCT tab.username, tab.idusers, tab.status, max(tab.roomid) AS roomid
      FROM(
      SELECT users.username, users.idusers, friends.status, userInRoom.roomid
            FROM users
            INNER JOIN friends
            ON users.idusers=friends.user_id
            OR (users.idusers=friends.friend_id AND friends.status=1)
            LEFT JOIN userInRoom
            ON users.idusers=userInRoom.userid
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
              AND (friends.user_id=? OR friends.friend_id=?)
              AND IF(friends.status=1,roomid IN 
                (SELECT a.roomid
                FROM userInRoom AS a
                INNER JOIN userInRoom AS b
                ON a.roomid = b.roomid
                WHERE a.userid=users.idusers
                AND b.userid=?),NULL)
          UNION 
              SELECT users.username, users.idusers, friends.status, NULL
            FROM users
            INNER JOIN friends
            ON users.idusers=friends.user_id
            OR (users.idusers=friends.friend_id AND friends.status=1)
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
            AND (friends.user_id=? OR friends.friend_id=?)) AS tab
            WHERE tab.idusers=?
            GROUP BY tab.username  
          `;
      const result = await con.query(sql, [
        friendid,
        friendid,
        friendid,
        friendid,
        friendid,
        friendid,
        friendid,
        friendid,
        friendid,
        idusers,
      ]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
