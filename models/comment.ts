import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      require: [true, "Please provide a author name"],
    },
    content: {
      type: String,
      require: [true, "Please provide content"],
    },
    authorId: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
