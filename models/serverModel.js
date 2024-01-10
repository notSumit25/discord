import mongoose from "mongoose";
import { User } from "./userModel";

const serverSchema = new mongoose.Schema(
  {
    servername: { type: "String", required: true },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
<<<<<<< HEAD
    ServerAdmin:{
      type:"String" //who created the server
    },
    inviteCode: { 
    type: "String",
    required: true,
    default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
   },
    serverpic: {
      type: "String",
      required: true,
    }
=======
    inviteCode: { type: "String", required: true },
    serverPic: {
      type: "String",
      required: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
>>>>>>> f7b4037e584c84fac25690bcf2d59bf4531ee5e3
  },
  { timestamps: true }
);

<<<<<<< HEAD
const Server =  mongoose.model("Server", serverSchema);
=======
const Server = mongoose.models.Server || mongoose.model("Server", serverSchema);
>>>>>>> f7b4037e584c84fac25690bcf2d59bf4531ee5e3

export { Server };
