import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      require: [true, "Please provide a author name"],
    },
    title: {
      type: String,
      require: [true, "Please provide a title"],
    },
    content: {
      type: String,
      require: [true, "Please provide content"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
