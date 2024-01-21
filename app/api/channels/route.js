import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { Server } from "@/models/serverModel";
import { useParams } from "next/navigation";

await connect();
export async function POST(req) {
  try {
    const reqBody= await req.json();
    const { name ,type, param} = reqBody;
    console.log(name,type);
    const user = await currentUser();
    console.log(param);  
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    if (!param) {
        return new NextResponse("Server ID missing", { status: 400 });
      }
      // const isAuthorized = await Server.exists({
      //   id: param,
      //   users: {
      //     $elemMatch: {
      //       userId: userm.id,
      //       role: { $in: ["ADMIN","MODERATOR"] }
      //     }
      //   }
      // });
      // if (!isAuthorized) {
      //   return new NextResponse("Unauthorized", { status: 401 });
      // }
      const channel = await Channel.create({
        serverId:param,
        channelName:name,
        type:type,
      }
      );
    console.log('Channel Created Successfully')
    return new NextResponse('Channel Created Successfully');
  } catch (error) {
    console.log("[Channel_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}
