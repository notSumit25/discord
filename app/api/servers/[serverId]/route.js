import { NextResponse } from "next/server";
import { existingUser } from "@/lib/Current";
import { Server } from "@/models/serverModel";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel";

//delete server

export async function GET(req, { params }) {
   try {
      const server = await Server.findOne({ _id: params.serverId });
      if (!server) {
         return new NextResponse("Server not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(server));
   } catch (error) {
      console.log("[SERVER_ID_GET]", error);
      return new NextResponse("Internal Error", { status: 500 });
   }
}


export async function DELETE(req,{params}){
 try {
    const user=await currentUser();
   //  console.log(user.id)
    await Server.findOneAndDelete({_id:params.serverId})
    return new NextResponse('Server deleted successfully')

 } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
 }
}
//update server name and image
export async function PATCH(req,{params}){
    try {
      const user = await currentUser();
       const userm = await User.findOne({ userId: user.id });
       if (!userm) {
         return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
       }
       const {servername,serverpic}=await req.json();
       const server=await Server.findOneAndUpdate({_id:params.serverId},{servername:servername,serverpic:serverpic})
       return new NextResponse(`${servername} Updated`);
   
    } catch (error) {
       console.log("[SERVER_ID_UPDATED]", error);
       return new NextResponse("Internal Error", { status: 500 });
    }
   }
