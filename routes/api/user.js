const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwtVerification = require("../../middleware/auth.js");
const User = require("../../models/User");
const Announcements = require("../../models/Announcements");
const Events = require("../../models/Events");
const Complains = require("../../models/Complains");
const Issues = require("../../models/Issues");
const Gallery = require("../../models/Gallery");

router.get("/home", jwtVerification, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select({ password: 0 });
    const myannouncements = await Announcements.find({
      user: req.user.id,
    }).countDocuments();
    const myissues = await Issues.find({
      user: req.user.id,
    }).countDocuments();
    const myevents = await Events.find({
      user: req.user.id,
    }).countDocuments();
    const myuploads = await Gallery.find({
      user: req.user.id,
    }).countDocuments();
    res.status(200).json({
      user,
      countannouncements: myannouncements,
      countevents: myevents,
      countissues: myissues,
      countuploads: myuploads,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/userdata", jwtVerification, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select({ password: 0 });
    res.status(200).json({ user });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/updateprofile", jwtVerification, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    return res.status(200).json({ user });
  } catch (e) {
    res.response.status(500).send("Internal Server Error");
  }
});

router.post(
  "/updateprofile",
  jwtVerification,
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
    try {
      const { username, house_num, phone_num, email, password } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            username,
            house_num,
            phone_num,
            email,
            password,
          },
        },
        { new: true }
      );
      const salt_password = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt_password);
      await user.save();
      console.log(
        `User profile with email: ${user.email} updated successfully`
      );
      return res.status(200).json({ user });
    } catch (e) {
      res.response.status(500).send("Internal Server Error");
    }
  }
);

router.delete(
  "/deleteprofile/:profileid",
  jwtVerification,
  async (req, res) => {
    try {
      // await User.findByIdAndRemove({ _id: req.user.id });
      const user = await User.findOne({ _id: req.params.profileid });
      await user.remove();
      return res
        .status(200)
        .json({ msg: "Your profile has been successfully deleted" });
    } catch (e) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

// EVENTS ROUTES
router.get("/events", jwtVerification, async (req, res) => {
  try {
    const events = await Events.find().sort({ date: -1 });
    if (events.length === 0) {
      return res.status(200).json({ msg: "No events to show" });
    } else {
      return res.status(200).json({ events });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/myevents", jwtVerification, async (req, res) => {
  try {
    const myevents = await Events.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (myevents.length === 0) {
      return res.status(200).json({ msg: "You haven't added any events yet" });
    } else {
      return res.status(200).json({ myevents });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/events/add-a-new-event", jwtVerification, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select({
      _id: 1,
      username: 1,
      avatar: 1,
    });
    const { scheduledfor, type, description } = req.body;
    console.log(scheduledfor);
    const newevent = new Events({
      user: req.user.id,
      username: user.username,
      avatar: user.avatar,
      date: undefined,
      scheduledfor: scheduledfor,
      type: type,
      description: description,
    });
    await newevent.save();
    // console.log(`${user.username} added a new event`);
    const updatedevents = await Events.find().sort({ date: -1 });
    res.return.status(200).json({ updatedevents });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/myevents/delete-an-event", jwtVerification, async (req, res) => {
  try {
    const event = await Events.findOne({ _id: req.body.id });
    if (event.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You cannot delete an event added by other users." });
    }
    await event.remove();
    const updatedevents = await Events.find().sort({ date: -1 });
    if (updatedevents.length === 0) {
      return res.status(200).json({ msg: "You haven't added any events yet" });
    } else {
      return res.status(200).json({ updatedevents });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});
// ANNOUNCEMENTS ROUTES
router.get("/announcements", jwtVerification, async (req, res) => {
  try {
    const announcements = await Announcements.find().sort({ date: -1 });
    if (announcements.length === 0) {
      return res.status(200).json({ msg: "No Announcements to show" });
    } else {
      return res.status(200).json({ announcements });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/myannouncements", jwtVerification, async (req, res) => {
  try {
    const myannouncements = await Announcements.find({
      user: req.user.id,
    }).sort({ date: -1 });
    if (myannouncements.length === 0) {
      return res
        .status(200)
        .json({ msg: "You haven't posted any announcements yet" });
    } else {
      return res.status(200).json({ myannouncements });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/announcements/post-a-new-announcement",
  jwtVerification,
  async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user.id }).select({
        _id: 1,
        username: 1,
        avatar: 1,
      });
      const { subject, description } = req.body;
      const newannouncement = new Announcements({
        user: req.user.id,
        username: user.username,
        avatar: user.avatar,
        subject: subject,
        description: description,
      });
      await newannouncement.save();
      // console.log(`${user.username} posted a new announcement`);
      user.countannouncements++;
      await user.save();
      const updatedannouncements = await Announcements.find().sort({
        date: -1,
      });
      res.return.status(200).json({ updatedannouncements });
    } catch (e) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/myannouncements/delete-an-announcement",
  jwtVerification,
  async (req, res) => {
    try {
      const announcement = await Announcements.findOne({
        _id: req.body.id,
      });
      if (announcement.user.toString() !== req.user.id) {
        return res.status(401).json({
          msg: "You cannot delete an announcement posted by other users.",
        });
      }
      await announcement.remove();
      const updatedannouncements = await Announcements.find().sort({
        date: -1,
      });
      if (updatedannouncements.length === 0) {
        return res
          .status(200)
          .json({ msg: "You haven't posted any announcement yet" });
      } else {
        return res.status(200).json({ updatedannouncements });
      }
    } catch (e) {
      return res.status(500).send("Internal Server Error");
    }
  }
);
// ISSUES ROUTES
router.get("/issues", jwtVerification, async (req, res) => {
  try {
    const issues = await Issues.find().sort({ date: -1 });
    if (issues.length === 0) {
      return res.status(200).json({ msg: "No issues to show" });
    } else {
      return res.status(200).json({ issues });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/myissues", jwtVerification, async (req, res) => {
  try {
    const myissues = await Issues.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (myissues.length === 0) {
      return res.status(200).json({ msg: "You haven't raised any issues yet" });
    } else {
      return res.status(200).json({ myissues });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/issues/raise-a-new-issue", jwtVerification, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select({
      _id: 1,
      username: 1,
      avatar: 1,
    });
    const { subject, description, postAnonymously } = req.body;
    let newissue;
    if (postAnonymously) {
      newissue = new Issues({
        user: req.user.id,
        username: "Anonymous user",
        avatar: user.avatar,
        subject: subject,
        description: description,
      });
    } else if (!postAnonymously) {
      newissue = new Issues({
        user: req.user.id,
        username: user.username,
        avatar: user.avatar,
        subject: subject,
        description: description,
      });
    }
    await newissue.save();
    user.countissues++;
    await user.save();
    const updatedissues = await Issues.find().sort({ date: -1 });
    res.return.status(200).json({ updatedissues });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/issues/delete-an-issue/", jwtVerification, async (req, res) => {
  try {
    const issue = await Issues.findOne({ _id: req.body.id });
    if (issue.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You cannot delete an issue raised by other users." });
    }
    await issue.remove();
    const updatedissues = await Issues.find().sort({ date: -1 });
    if (updatedissues.length === 0) {
      return res.status(200).json({ msg: "You haven't raised any issue yet" });
    } else {
      return res.status(200).json({ updatedissues });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

// COMPLAINS ROUTES
router.get("/mycomplains", jwtVerification, async (req, res) => {
  try {
    const mycomplains = await Complains.find({ user: req.user.id }).sort({
      date: -1,
    });
    if (mycomplains.length === 0) {
      return res
        .status(200)
        .json({ msg: "You haven't filed any complain yet" });
    } else {
      return res.status(200).json({ mycomplains });
    }
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/mycomplains/file-a-new-complain",
  jwtVerification,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select({
        _id: 1,
        username: 1,
        avatar: 1,
      });
      const { type, description, house_num } = req.body;
      const newcomplain = new Complains({
        user: req.user.id,
        username: user.username,
        avatar: user.avatar,
        house_num: house_num,
        type: type,
        description: description,
      });
      await newcomplain.save();
      user.countcomplains++;
      await user.save();
      const updatedcomplains = await Complains.find({
        user: req.user.id,
      }).sort({ date: -1 });
      return res.status(200).json({ updatedcomplains });
    } catch (e) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/mycomplains/delete-a-complain",
  jwtVerification,
  async (req, res) => {
    try {
      const complain = await Complains.findOne({ _id: req.body.id });
      if (complain.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "You cannot delete a complain filed by other users." });
      }
      await complain.remove();
      const updatedcomplains = await Complains.find({ user: req.user.id }).sort(
        {
          date: -1,
        }
      );
      if (updatedcomplains.length === 0) {
        return res
          .status(200)
          .json({ msg: "You haven't filed any complain yet" });
      } else {
        return res.status(200).json({ updatedcomplains });
      }
    } catch (e) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MTE4MGU4NDgyOWQxMjdmNDZmMzA3In0sImlhdCI6MTY1MDUzMDMxOCwiZXhwIjoxNjUwODkwMzE4fQ.VtvxGz9qcyz5EOoDAocdOeuQ5-A-z-XrtE1DYozqnXQ
