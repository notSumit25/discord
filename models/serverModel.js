import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { User } from "./userModel";
import { Channel } from "./channelModel";
const serverSchema = new mongoose.Schema(
  {
    servername: { type: "String", required: true },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          default: "Member",
        },
        SpecialRole:{
          type: String,
        }
      },
    ],
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        default: "general",
      },
    ],
    ServerAdmin: {
      type: "String",
    },
    inviteCode: {
      type: "String",
      required: true,
      default: uuidv4(),
    },
    serverpic: {
      type: "String",
    },
  },
  { timestamps: true }
);

const Server = mongoose.models.Server || mongoose.model("Server", serverSchema);

export { Server };
