const path = require("path");
module.exports = {
  entry: {
    // index: "./public/javascripts/index.js",
    user: "./public/js/user.js",
  },
  output: {
    path: path.resolve(__dirname, "public/bundles"),
    filename: "[name].bundle.js",
  },
};
