const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    urlTitle: {
      type: String,
      required: true,
      unique: true
    },
    imgUrl: {
      type: String,
      required: true
    },

    body: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true,
      default: 0
    },
    keywords: {
      type: String,
      default: this.title
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
