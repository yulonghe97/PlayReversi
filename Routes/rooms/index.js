const router = require("express").Router();
const verify = require("../verifyToken");
const jwt = require("jsonwebtoken");


router.get("/", async (req, res) => {
    res.json({message: 'rooms'});
});

module.exports = router;
