import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { Server } from "@/models/serverModel";
import { useParams } from "next/navigation";
import { Message } from "@/models/messageModel";


await connect();
export async function POST(req) {
  try {
    const reqBody= await req.json();
    const { channelId,serverId,content } = reqBody;
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
   
      const newMesage = await Message.create({
       sender:userm._id,
       content:content,
       server:serverId,
       channel:channelId
      }
      );
     
    return new NextResponse(newMesage);
  } catch (error) {
    console.log("[Message_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}

