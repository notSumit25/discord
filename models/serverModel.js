import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
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
    ServerAdmin:{
      type:"String" //who created the server
    },
    inviteCode: { 
    type: "String",
    required: true,
    default:uuidv4()
   },
    serverpic: {
      type: "String",
      required: true,
    }
  },
  { timestamps: true }
);

const Server = mongoose.models.Server || mongoose.model("Server", serverSchema);

export { Server };
