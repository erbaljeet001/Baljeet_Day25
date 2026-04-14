const express = require("express");
const { registerUser, loginuser, loginUser } = require("../controllers/authController");
const  router= express.Router();

router.post("/registerd", registerUser)
router.post("/login", loginUser)
module.exports=router;