require("dotenv").config();
const util = require("util");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql");


const connection = mysql.createPool({
  // connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


const sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "sid",
        data: "session",
        expires: "expires"
      }
    }
  },
  connection
);

connection.query = util.promisify(connection.query);
con = connection;
module.exports = { con, sessionStore };
