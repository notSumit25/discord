import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        reciever:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        content:{
            type: String,
            trim:true
        },
        server:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Server"
        },
        channel:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Channel"
        }  
    },
    { timestamps: true }
  );
  
  const Message =  mongoose.models.Message || mongoose.model("Message", MessageSchema);
  
  export { Message };