var express = require("express");
var passport = require("passport");
var bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const path = require('path');

let dir = path.join(__dirname, '..', 'views');

var router = express.Router();

var User = require("../models/User");
var key = require("../mysetup/myurl");
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  var newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    pno: req.body.pno
  });

  await User.findOne({ email: newUser.email })
    .then(async profile => {
      if (!profile) {
            
            await newUser
              .save()
              .then(() => {
                // Signed successfully!
                req.flash('sign', "success");
                // res.status(200).send(newUser);
                res.redirect("/");
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
      } else {
        req.flash("sign", "fail");
        res.redirect("/signup");
        // res.send("User already exists...");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

router.get("/login", (req, res) => {

  if (req.flash("sign") != "success") {
  req.flash("sign", "");
  }
  const rParam = req.flash("sign");
  const userParam = req.flash("user");

  res.render("login", {rParam,
                    userParam
});
});

router.get("/signup", (req, res) => {
  // req.flash("user", "")
  res.render("/signup", {rParam: req.flash("sign")});
});


router.post("/login", async (req, res) => {
  
  var newUser = {};
  newUser.name = req.body.name;
  newUser.password = req.body.password;

  await User.findOne({ name: newUser.name })
    .then(profile => {  
      if (!profile) {    
        req.flash("user", "fail");
        res.redirect("/");
        // res.send("User not exist");
        
      } else {
        bcrypt.compare(
          req.body.password,
          profile.password,
          async (err, result) => {
            // console.log("" + result)
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              // 
                // res.render("login");
                console.log(profile.password);
                // console.log(result);
                res.send("User authenticated");
            
            } else {
              console.log("newUser.name " + newUser.password);
              console.log("profile.name " + profile.password);
              req.flash("user", "fail");
              res.redirect("/");
              // res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
    
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name
    });
  }
);

module.exports = router;
