const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get("/register", (req,res)=>{ //envio el usuario
  res.send("Hola estoy en register")
});



router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});



router.get("/login", (req,res)=>{
  res.send(req.user)
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});


router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  res.send(req.user);
});

router.use("/", function (req, res) {//preguntar a feli
  res.sendStatus(404);
});

module.exports = router;
