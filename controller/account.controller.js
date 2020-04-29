const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.get("/current", (req, res) => {
  const { user } = req.session;
  res.json(user);
});
router.get("/stats/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.get(id);
  res.json({
    user,
  });
});

module.exports = router;
