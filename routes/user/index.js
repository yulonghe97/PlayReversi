const router = require("express").Router();
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");


router.get("/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Unable To Find User" });
  }
});

module.exports = router;
