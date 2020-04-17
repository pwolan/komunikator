const { con } = require("../database/config");

module.exports = {
  async send(roomid, senderid, message) {
    var now = Date.now();
    var date = new Date(now);
    var sql = "INSERT INTO messages (roomid,senderid,message,date) VALUES (?,?,?,?)";
    await con.query(sql, [roomid, senderid, message, date]);
  },
  async view(roomid, number) {
      console.log(number)
    var limit = number * 30;
    console.log(limit)
    var sql = `SELECT users.username, users.avatar, messages.senderid, messages.message
      FROM messages
      INNER JOIN users
      ON users.idusers = messages.senderid
      WHERE roomid=?
      ORDER BY messages.date DESC
      LIMIT ?,30`;
    try {
      const result = await con.query(sql, [roomid, limit]);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
