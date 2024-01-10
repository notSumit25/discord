import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: { type: "String", required: true },
    userid:{type:'String'},
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
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

const User = mongoose.models.User || mongoose.model("users", userSchema);

export { User };