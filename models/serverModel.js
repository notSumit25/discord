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
    inviteCode: { type: "String", required: true },
    serverPic: {
      type: "String",
      required: true,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Server = mongoose.models.Server || mongoose.model("Server", serverSchema);

export { Server };
