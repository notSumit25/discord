import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: { type: "String", required: true },
    serverId: {
      type: "String",
      ref: "Server",
    },
    type: {
      type: "String",
      default: "TEXT",
    },
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
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Channel =
  mongoose.models.Channel || mongoose.model("Channel", channelSchema);

export { Channel };
