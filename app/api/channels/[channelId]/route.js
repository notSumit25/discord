import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { Server } from "@/models/serverModel";

await connect();

//admin and moderator -> delete channel api
export async function DELETE(req,{params})
{
    try {
        const {serverId} = await req.json();
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    if (!serverId) {
        return new NextResponse("Server ID missing", { status: 400 });
      }
      if (!params.channelId) {
        return new NextResponse("Channel ID missing", { status: 400 });
      }
      const isAuthorized = await Server.exists({
        _id: serverId,
        users: {
          $elemMatch: {
            userId: userm._id,
            role: { $in: ["ADMIN","MODERATOR"] }
          }
        }
      });
      if (!isAuthorized) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const server = await Server.findByIdAndUpdate(
        serverId,
        {
          $pull: {
            channels: {
                _id: params.channelId,
                name: { $ne: "Member" }
            }
          }
        },
        { new: true }
      );
      return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
//update name and type by admin and moderator

export async function PATCH(req,{params}){
    try {
        const { name, type } = await req.json();
        const user=await currentUser();
        const serverId = req.query.serverId; 
        const userm=await User.findOne({userId:user.id})
        if(!userm)
        {
            return new NextResponse.json({message:"Unauthorized"}, { status: 401 }); 
        }
        if(!serverId)
        {
            return new NextResponse("Server ID missing", { status: 400 });
        }
        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
          }
          const isAuthorized = await Server.exists({
            _id: serverId,
            users: {
              $elemMatch: {
                userId: userm._id,
                role: { $in: ["ADMIN","MODERATOR"] }
              }
            }
          });
          if (!isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
          }

        const server = await Server.findByIdAndUpdate(
       {
        _id: serverId,
        "channels._id": params.channelId,
        "channels.name": { $ne: "Member" }
       },
        {
          $set: {
            "channels.$.Channelname": name,
            "channels.$.type": type
          }
        },
        { new: true }
      );
      return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_UPDATED]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}