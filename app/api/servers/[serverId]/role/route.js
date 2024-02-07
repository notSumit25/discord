import { connect } from "@/lib/db.js";
import { Server } from "@/models/serverModel.js";
import { NextRequest,NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";

import { Channel } from "@/models/channelModel";

await connect();
//assign role
export async function POST(req,{params}) {
  try {
    const reqBody = await req.json();
  
    const { role,userId } = reqBody;
      const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
   
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    if(!params.serverId)
    {
        return new NextResponse.json({message:"ServerId is required"}, { status: 401 });
    }
    const newServer = await Server.findOne(
        {
            _id:params.serverId,
            "users.userId":userId
        }
    )
    const userToUpdate = newServer.users.find(user => user.userId.equals(userId));
    userToUpdate.SpecialRole= role;
    console.log(userToUpdate);
    newServer.save();
   
    console.log('Server Updated Successfully')
    return new NextResponse('Server Updated Successfully')
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}

export async function PATCH(req,{params}){

    try{
      const reqBody = await req.json();
      const { userId } = reqBody;
      const user = await currentUser();
      const userm = await User.findOne({ userId: user.id });
     
      if (!userm) {
        return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
      }
      if(!params.serverId)
      {
          return new NextResponse.json({message:"ServerId is required"}, { status: 401 });
      }
 
      const updatedServer = await Server.findOneAndUpdate(
        { _id: params.serverId },
        { $pull: { users: { userId: userId } } },
        { new: true }
    ).exec();
 
    const User_server_update = await User.findOneAndUpdate(
      { userId: user.id },
      {
        $pull: { server: updatedServer._id }
      }
    );  
            return new NextResponse('Server Updated Successfully')
  } catch (error) {
    console.log("[SERVERS_GETs]", error);
    return new NextResponse({message: "Internal Error"});
  }
}
