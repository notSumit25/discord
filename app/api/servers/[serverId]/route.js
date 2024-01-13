import { NextResponse } from "next/server";
import { existingUser } from "@/lib/Current";
import { Server } from "@/models/serverModel";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel";

//delete server
export async function DELETE(req,{params}){
 try {
    const user=await currentUser();
    console.log(user.id)
    await Server.findOneAndDelete({_id:params.serverId})
    return new NextResponse.json({"msg":`server is deleted`})

 } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
 }
}
//update server name and image
export async function PATCH(req,{params}){
    try {
       const profile=await existingUser();
       if(!profile)
       {
           return NextResponse("Unauthorised",{status:401});
       }
       const {servername,serverpic}=await req.json();
       const server=await Server.findOneAndUpdate({_id:params.serverId},{servername:servername,serverpic:serverpic})
       return NextResponse.json({"msg":`${server} is updated`})
   
    } catch (error) {
       console.log("[SERVER_ID_UPDATED]", error);
       return new NextResponse("Internal Error", { status: 500 });
    }
   }
