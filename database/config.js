require("dotenv").config();
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql");

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//   password: "WybrykNatury_ZwanyWirusemLubZarazą25",
//   database: "drinktogether"
// });
const con = mysql.createConnection({
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
  con
);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { con, sessionStore };
