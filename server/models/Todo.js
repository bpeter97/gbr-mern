const mongoose = require("mongoose");

const TodoSchema = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Todo;
