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
    var now = Date.now();
    var date = new Date(now);
    var sql = "INSERT INTO messages (roomid,senderid,message,date) VALUES (?,?,?,?)";
    const { insertId } = await con.query(sql, [roomid, senderid, message, date]);
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
};
