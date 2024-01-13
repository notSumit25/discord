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
  
      const server = await Server.findOneAndUpdate(
        { _id: params.serverId, users: profile._id },
        {
          $pull: { users: profile._id }, 
        },
        { new: true }
      );
  
      if (!server) {
        return new NextResponse("Server not found or user not a member", { status: 404 });
      }
  
      return new NextResponse.json(server);
    } catch (error) {
      console.log("[SERVER_ID_LEAVE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }