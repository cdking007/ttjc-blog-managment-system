const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "member",
      required: true
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  },
  {
    timestamps: true
  }
);
UserSchema.pre("save", async function() {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  if (user.isModified("username")) {
    user.username = user.username.toLowerCase().trim();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
