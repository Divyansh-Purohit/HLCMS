const mongoose = require("mongoose");
const ComplainsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resolved_by_user: {
    type: Boolean,
    default: false,
  },
  admin_can_delete: {
    type: Boolean,
    default: false,
  },
  house_num: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Complain", ComplainsSchema);
