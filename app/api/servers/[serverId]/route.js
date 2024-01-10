import { NextResponse } from "next/server";
import { currentUser } from "@/lib/currentUser";
import { Server } from "@/models/serverModel";

//delete server
export async function DELETE(req,{params}){
 try {
    const profile=await currentUser();
    if(!profile)
    {
        return NextResponse("Unauthorised",{status:401});
    }
    const serverId={params}
    const server=await Server.findOneAndDelete({serverId})
    return NextResponse.json({"msg":`${server} is deleted`})

 } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
 }
}
//update server name and image
export async function PATCH(req,{params}){
    try {
       const profile=await currentUser();
       if(!profile)
       {
           return NextResponse("Unauthorised",{status:401});
       }
       const {servername,serverpic}=await req.json();
       const serverId={params}
       const server=await Server.findOneAndUpdate(serverId,{servername:servername,serverpic:serverpic})
       return NextResponse.json({"msg":`${server} is updated`})
   
    } catch (error) {
       console.log("[SERVER_ID_UPDATED]", error);
       return new NextResponse("Internal Error", { status: 500 });
    }
   }
