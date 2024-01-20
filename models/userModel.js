import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userId: { type: "String", unique: true},
    username: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    // password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    server:
    [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Server"
    }],
    channel:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Channel"
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User}
