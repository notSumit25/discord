import { connect } from "@/lib/db.js";
import { Server } from "@/models/serverModel.js";
import { NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";

import { Channel } from "@/models/channelModel";

await connect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
  
    const { servername, serverpic } = reqBody;
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
   
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    const newServer = await Server.create({
      ServerAdmin: user.id,
      users: [{userId:userm.id,role:'Admin'}],
      servername,
      serverpic,
    });
    const newchannel = await Channel.create({
      serverId:newServer._id,
      channelName:"general",
      type:"TEXT", 
      users:[
      {
        userId:userm._id,
        role:"ADMIN"
      } 
      ]
    }
    );
    const Server_Channel_update=await Server.findByIdAndUpdate(
      newServer._id,
      {
        $push: { channels: newchannel }
      }
    );    
    const User_channel_update = await User.findOneAndUpdate(
      { userId: user.id },
      {
        $push: { channel: newchannel }
      }
    );    
    const User_server_update = await User.findOneAndUpdate(
      { userId: user.id },
      {
        $push: { server: newServer }
      }
    );    
    console.log('Server Created Successfully')
    return new NextResponse('Server Created Successfully')
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}

export async function GET(req){

    try{
      const reqBody = await req.json();
      console.log(reqBody);
      const { serverId } = reqBody;
      const server = await Server.findById(serverId);
      console.log(server);
      return  new NextResponse(
        JSON.stringify(server),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
  } catch (error) {
    console.log("[SERVERS_GETs]", error);
    return new NextResponse({message: "Internal Error"});
  }
}
