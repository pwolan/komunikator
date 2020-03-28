const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors");
const { sessionStore } = require("./database/config");

//template engine
app.set("views", path.join(__dirname, "view/pages"));
app.locals.basedir = path.join(__dirname, "view");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public/sass"),
    dest: path.join(__dirname, "public/css"),
    // debug: true,
  })
);
app.use(express.static(__dirname + "/public"));

//cookies and session
app.use(cookieParser());
app.use(
  session({
    store: sessionStore,
    key: "session_sid",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 60000000
    }
  })
);

//add router
app.use(require("./controller/router.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listen on " + port));
