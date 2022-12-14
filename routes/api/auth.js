const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const jwtVerification = require("../../middleware/auth.js");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const router = express.Router();

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: config.get("NODEMAILER_SG_KEY"),
    },
  })
);

router.get("/", jwtVerification, async (req, res) => {
  try {
    const user = User.findOne(req.user.id).select("-password");
    return res.json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/postlogin",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").not().isEmpty().withMessage("Provide a password"),
  ],
  async (req, res) => {
    const complain_manager_email = config.get("complain_manager_email");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const isCM = complain_manager_email === email ? true : false;
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "No account with that email exists" }] });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect Password" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          console.log(isCM);
          return res.json({ token, user, isCM });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/postsignup",
  [
    check("username")
      .isLength({ min: 3, max: 10 })
      .withMessage(
        "Username should be minimum 3 characters and maximum 10 characters"
      ),
    check("username")
      .matches(/^[A-Za-z-]+$/)
      .withMessage("Username should contain only alphabets and '-'"),
    check("house_num")
      .not()
      .isEmpty()
      .withMessage("Provide a valid house number"),
    check("house_num")
      .matches(/^[A-Za-z0-9-_\/]+$/)
      .withMessage(
        "House number should only contain alphabets, digits, '-' and '/"
      ),
    check("house_num")
      .isLength({ max: 7 })
      .withMessage("House number length can't exceed 7 characters"),
    check("phone_num")
      .isLength({ min: 10, max: 10 })
      .isNumeric()
      .withMessage("Provide a valid phone number"),
    check("email")
      .isEmail()
      .withMessage("Provide a valid email")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password should be minimum 6 and maximum 20 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, house_num, phone_num, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        username,
        house_num,
        phone_num,
        email,
        password,
        avatar,
      });
      const salt_password = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt_password);

      await user.save();

      transporter.sendMail({
        to: `${user.email}`,
        from: config.get("admin_email"),
        subject: "Signup successful!",
        html: "<h1>Account Created</h1><p>Thankyou for signing in to the Halwara afs online portal.</p>",
      });

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
