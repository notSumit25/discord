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
  },
  { timestamps: true }
);

const Server =  mongoose.model("Server", serverSchema);

export { Server };