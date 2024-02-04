import { NextResponse } from "next/server";
import { Server } from "@/models/serverModel";
import { currentUsers } from "@/lib/currentUser";

export async function PATCH(req,{ params }) {
    try {
      const profile = await currentUsers();
  
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      if (!params.serverId) {
        return new NextResponse("Server ID missing", { status: 400 });
      }
      console.log(profile._id);
       
      const admin = await Server.findOne({
        _id: params.serverId,
        "users.userId": profile._id,
    });
    
    console.log(admin);
    
    if (admin) {
        await Server.findOneAndDelete({ _id: params.serverId });
        return new NextResponse('Server deleted successfully');
    }
    
      const server = await Server.findOneAndUpdate(
        { 
            _id: params.serverId, 
            "users.userId": profile._id 
        },
        {
            $pull: { "users": { userId: profile._id } },
        },
        { new: true }
    );
    
  
      if (!server) {
        return new NextResponse("Server not found or user not a member", { status: 404 });
      }
  
      return new NextResponse('Server deleted successfully');
    } catch (error) {
      console.log("[SERVER_ID_LEAVE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }