import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const RoleSchema = new mongoose.Schema(
  {
    Role: { type: "String"},
    channels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Channel",
          default: "general",
        },
      ],
      Servers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Server" }],
      Users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);


const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);
export { Role };
