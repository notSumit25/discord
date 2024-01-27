import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { Server } from "@/models/serverModel";
import { Prata } from "next/font/google";

await connect();

//admin and moderator -> delete channel api
export async function DELETE(req,{params})
{
    try {
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
      await Channel.findByIdAndDelete(params.channelId);
      return NextResponse.json("channel deleted");
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
//update name and type by admin and moderator

export async function PATCH(req,{params}){
    try {
        const { name, type } = await req.json();
        console.log(name,type);
        const user=await currentUser();
        const userm=await User.findOne({userId:user.id})
        if(!userm)
        {
            return new NextResponse.json({message:"Unauthorized"}, { status: 401 }); 
        }
        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
          }
         const channel =await Channel.findByIdAndUpdate(params.channelId,{
          channelName:name,
          type:type,
         })
      return NextResponse.json(channel);
    } catch (error) {
        console.log("[CHANNEL_UPDATED]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}