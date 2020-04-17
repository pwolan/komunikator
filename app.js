var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors");
const { sessionStore } = require("./database/config");
var favicon = require("serve-favicon");

var app = express();

app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views/pages"));
app.locals.basedir = path.join(__dirname, "views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  sassMiddleware({
    src: __dirname + "/public",
    dest: __dirname + "/public",
    outputStyle: "compressed",
    // debug: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
let mainSession = session({
  store: sessionStore,
  key: "session_sid",
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 60000000,
  },
});
app.use(mainSession);

app.use("/favicon.ico", express.static(path.join(__dirname + "images/favicon.ico")));
app.use(require("./controller/router.js"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, mainSession };
