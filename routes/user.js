const express = require("express");
const router = express.Router();
const User = require("../models/User");
//const jsonwebtoken = require("jsonwebtoken");

router.get("/", async (req, res) => {
  //res.send('Get Req');
  try {
    const datas = await User.find();
    res.json(datas);
  } catch (err) {
    res.send("Error:" + err);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const dataid = await User.findById(req.params._id);
    res.json(dataid);
  } catch (err) {
    res.send("Error:" + err);
  }
});

router.post("/register", async (req, res) => {
  if (await userExists(req.body.email)) {
    res.status(409).json({ error: "Email alreaday exists" });
  } else {
    const dataForm = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contactno: req.body.contactno,
      password: req.body.password,
      confpass: req.body.confpass,
    });
    try {
      if (req.body.password == req.body.confpass) {
        dataForm.save(dataForm).then((data) => {
          res.status(200).json({
            success: true,
            user:dataForm
          });
        });
      } else {
        res.status(401).json({ error: "Password must be same" });
      }
    } catch (err) {
      res.send("Error:" + err);
    }
  }
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password }).then(datas => {
      if (datas) {
        res.status(200).json({
          success: true,
          //user:dataForm
        });
          //res.status(200).json(datas)

      }
      else {
          res.status(401).json({ error: 'Incorrect email or password' })
      }
  }).catch(err => {
      res.status(500).json({ error: err.message })
  })
});

router.delete("/:_id", (req, res) => {
  User.findByIdAndRemove(req.params._id)
    .then((res) => {
      res.json({ msg: "User Deleted" });
    })
    .catch((err) => {
      res.json(err);
    });
});

const userExists = async (email) => {
  const datas = await User.findOne({ email: email });

  if (datas) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;
