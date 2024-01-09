import mongoose from "mongoose";


const serverSchema = mongoose.Schema(
  {
    servername: { type: "String", required: true },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    inviteCode: { type: "String", required: true },
    serverpic: {
      type: "String",
      required: true,
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

  },
  { timestamps: true }
);

const Server =  mongoose.model("server", serverSchema);

export { Server };