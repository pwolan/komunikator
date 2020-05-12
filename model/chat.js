const { con } = require("../database/config");

module.exports = {
  async create(ids, name_room = null) {
    var sql = `INSERT INTO rooms (name_room) VALUES (?);`;
    try {
      const { insertId } = await con.query(sql, [name_room]);
      this.add(insertId, ids);
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async add(result, ids) {
    let querys = ids.map(async (id) => {
      var sql = `INSERT INTO userInRoom (userid, roomid) VALUES (?,?)`;
      return await con.query(sql, [id, result]);
    });
    await Promise.all(querys);
    return;
  },
  async send(roomid, senderid, message) {
    //let date = new Date();
    //let now = date.getTime();
    //console.log(date);
    let now = Date.now();
    console.log(now);
    var sql = "INSERT INTO messages (roomid,senderid,message,date) VALUES (?,?,?,?)";
    const { insertId } = await con.query(sql, [roomid, senderid, message, now]);
    var sql2 = `SELECT users.username, users.avatar, messages.idmessages, messages.senderid, messages.message, messages.date
    FROM messages
    INNER JOIN users
    ON users.idusers = messages.senderid
    WHERE idmessages=?`;
    const result = await con.query(sql2, [insertId]);
    return result;
  },
  async view(roomid, number) {
    var limit = parseInt(number);
    var sql = `SELECT users.username, users.avatar, messages.idmessages, messages.senderid, messages.message, messages.date
      FROM messages
      INNER JOIN users
      ON users.idusers = messages.senderid
      WHERE roomid=?
      ORDER BY messages.idmessages DESC
      LIMIT ?,30`;
    try {
      const result = await con.query(sql, [roomid, limit]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async stats(roomid, idusers) {
    let sql = `SELECT IFNULL(rooms.name_room, users.username COLLATE utf8_unicode_ci) as roomName
    FROM rooms
    INNER JOIN userInRoom
    ON rooms.idrooms = userInRoom.roomid
    INNER JOIN users
    ON userInRoom.userid = users.idusers
    WHERE roomid=? AND userid!=?
     `;
    try {
      const result = await con.query(sql, [roomid, idusers]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async last(userid, number) {
    var limit = parseInt(number);
    let sql = `SELECT rooms.idrooms, IFNULL(rooms.name_room, users.username) AS roomname, IFNULL(rooms.avatar_room, users.avatar) AS avatar, messages.message, messages.date
    FROM users
    INNER JOIN userInRoom
    ON users.idusers=userInRoom.userid
    INNER JOIN rooms
    ON userInRoom.roomid=rooms.idrooms
    INNER JOIN messages
    ON rooms.idrooms=messages.roomid
    WHERE idrooms IN
    (SELECT rooms.idrooms
    FROM messages
    INNER JOIN rooms
    ON messages.roomid=rooms.idrooms
    INNER JOIN userInRoom
    ON rooms.idrooms=userInRoom.roomid
    INNER JOIN users
    ON userInRoom.userid=users.idusers
    WHERE idmessages IN (
      SELECT MAX(idmessages)
        FROM messages
        GROUP BY roomid)
    AND users.idusers=?
    ORDER BY messages.date DESC)
    AND users.idusers!=?
    AND idmessages IN (
      SELECT MAX(idmessages)
        FROM messages
        GROUP BY roomid)
    GROUP BY rooms.idrooms
    ORDER BY messages.date DESC
    LIMIT ?,20`;
    try {
      const result = await con.query(sql, [userid, userid, limit]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async getUsers(roomid) {
    let sql = `SELECT users.idusers
    FROM users
    INNER JOIN userInRoom
    ON users.idusers=userInRoom.userid
    INNER JOIN rooms
    ON userInRoom.roomid=rooms.idrooms
    WHERE rooms.idrooms=?`;
    const result = await con.query(sql, [roomid]);
    return result;
  },
  async getChat(userid, roomid) {
    let sql = `SELECT rooms.idrooms, IFNULL(rooms.name_room, users.username) AS roomname, IFNULL(rooms.avatar_room, users.avatar) AS avatar, messages.message, messages.date
    FROM users
    INNER JOIN userInRoom
    ON users.idusers=userInRoom.userid
    INNER JOIN rooms
    ON userInRoom.roomid=rooms.idrooms
    INNER JOIN messages
    ON rooms.idrooms=messages.roomid
    WHERE idrooms IN
    (SELECT rooms.idrooms
    FROM messages
    INNER JOIN rooms
    ON messages.roomid=rooms.idrooms
    INNER JOIN userInRoom
    ON rooms.idrooms=userInRoom.roomid
    INNER JOIN users
    ON userInRoom.userid=users.idusers
    WHERE idmessages IN (
      SELECT MAX(idmessages)
        FROM messages
        GROUP BY roomid)
    AND users.idusers=?
    ORDER BY messages.date DESC)
    AND users.idusers!=?
    AND idmessages IN (
      SELECT MAX(idmessages)
        FROM messages
        GROUP BY roomid)
    AND rooms.idrooms=?
    GROUP BY rooms.idrooms
    ORDER BY messages.date DESC;`;
    const result = await con.query(sql, [userid, userid, roomid]);
    return result;
  },
};
