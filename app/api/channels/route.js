import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { Server } from "@/models/serverModel";

await connect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
  
    const { name ,type} = reqBody;
    const user = await currentUser();
    const serverId = req.query.serverId; 
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    if (!serverId) {
        return new NextResponse("Server ID missing", { status: 400 });
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
          $push: {
            channels: {
              users: [{userId:userm.id,role:'Admin'}],
              channelName:name,
              type:type
            }
          }
        },
        { new: true }
      );
    console.log('Channel Created Successfully')
    return new NextResponse.json({server});
  } catch (error) {
    console.log("[Channel_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}
