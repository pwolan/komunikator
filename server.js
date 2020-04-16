const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const sassMiddleware = require("node-sass-middleware");
// const cors = require("cors");
// const { sessionStore } = require("./database/config");
// const helmet = require("helmet");

//socket testing
// const http = require("http").createServer(app);
// const io = require("socket.io")(http);
// const { initSocket } = require("./controller/chat.controller");
// initSocket(io);

// app.use(helmet());
//template engine
// app.set("views", path.join(__dirname, "view/pages"));
// app.locals.basedir = path.join(__dirname, "view");
// app.set("view engine", "pug");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.use(
//   sassMiddleware({
//     src: __dirname + "/public",
//     dest: __dirname + "/public",
//     outputStyle: "compressed",
//     // debug: true
//   })
// );
// app.use(express.static(path.join(__dirname, "public")));

//cookies and session
// app.use(cookieParser());
// app.use(
//   session({
//     store: sessionStore,
//     key: "session_sid",
//     secret: "secret",
//     resave: true,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60000000,
//     },
//   })
// );

//add router
// app.use(require("./controller/router.js"));

// const port = process.env.PORT || 3000;
// http.listen(port, () => console.log("Listen on " + port));
