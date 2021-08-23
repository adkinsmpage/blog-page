import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a user name"],
    },
    email: {
      type: String,
      require: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please provide password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
