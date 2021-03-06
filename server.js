const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");
const cors = require("cors");
const { sessionStore } = require("./database/config");
const helmet = require("helmet");
require("dotenv").config();

const http = require("http").createServer(app);

app.use(helmet());
//template engine
app.set("views", path.join(__dirname, "views/pages"));
app.locals.basedir = path.join(__dirname, "views");
app.set("view engine", "pug");

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

// app.use(express.static(path.join(__dirname, "client/public")));

//cookies and session
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
app.use(cookieParser());
app.use(mainSession);

var sharedsession = require("express-socket.io-session");
const io = require("socket.io")(http);
io.use(sharedsession(mainSession));

io.set("authorization", (handshake, accept) => {
  mainSession(handshake, {}, (err) => {
    if (err) return accept(err);
    const session = handshake.session;
    accept(null, session.user != null);
  });
});

io.of("/friends").use(sharedsession(mainSession));
io.of("/chat").use(sharedsession(mainSession));
io.of("/chats").use(sharedsession(mainSession));

app.use("/favicon.ico", express.static(path.join(__dirname + "images/favicon.ico")));
//add router
app.use(require("./controller/router")(io));

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV) {
  let isDev = process.env.NODE_ENV.trim() === "development";
  if (!isDev) {
    app.use(express.static(path.join(__dirname, "client/build")));
  }
} else {
  app.use(express.static(path.join(__dirname, "client/build")));
}
const port = process.env.PORT || 3000;
http.listen(port, () => console.log("Listen on " + port));
