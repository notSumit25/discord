import mongoose from "mongoose";


const channelSchema = mongoose.Schema(
  {
    channelname: { type: "String", required: true },
    server:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Server"
        },
    Users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },    

  },
  { timestamps: true }
);

const Channel = mongoose.models.Channel ||  mongoose.model("Channel", channelSchema);

export { Channel };