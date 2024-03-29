const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const user_jwt = require("../middleware/user_jwt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
//const jsonwebtoken = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find()
      .select("-password")
      .select("-confpass");
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
    next();
  }
});
router.get('/:_id', async (req, res) => {
  try {
      const user = await User.findById(req.params._id);
      res.status(200).json({
        success: true,
        user: user,
  });
}catch (err) {
      res.send('Error:' + err);
  }
});
router.post("/register", async (req, res, next) => {
  const { fname, lname, contactno, email, password, confpass } = req.body;

  try {
    let user_exist = await User.findOne({ email: email });
    if (user_exist) {
      return res.status(400).json({
        success: false,
        msg: "User alredy exists. Please Login!!",
      });
    }

    let user = new User();
    user.fname = fname;
    user.lname = lname;
    user.contactno = contactno;
    user.email = email;

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    const csalt = await bcryptjs.genSalt(10);
    user.confpass = await bcryptjs.hash(confpass, csalt);

    let size = 200;
    user.avatar = "https://gravatar.com/avatar/?s=" + size + "&d=retro";

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtUserSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token: token,
        });
      }
    );

    res.status({
      success: true,
      msg: "User registered",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User Not Exist go & register to continue.",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Password",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtUserSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          msg: "User Logged In",
          token: token,
          user: user,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
});

module.exports = router;