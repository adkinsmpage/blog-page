import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  DATA_FORMAT,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../utils/consts";
import moment from "moment";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a user name"],
    },
    email: {
      type: String,
      require: [true, "Please provide a email"],
      match: [EMAIL_VALIDATION, "Invalid email address"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please provide password"],
      match: [PASSWORD_VALIDATION, "Invalid password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  (this as any).password = await bcrypt.hash((this as any).password, salt);
});

UserSchema.methods.correctPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if ((this as any).passwordChangedAt) {
    const changedTimestamp = moment((this as any).passwordChangedAt).format(
      DATA_FORMAT
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
export default mongoose.models.User || mongoose.model("User", UserSchema);
