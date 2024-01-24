import {v4 as uuidv4} from 'uuid'
import { NextResponse } from 'next/server'
import { Server } from '@/models/serverModel';
import { currentUser } from '@clerk/nextjs'
//generate new invite code 
export async function PATCH(req,{params}){
    try {
        const profile = await currentUser();
       if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!params.serverId) {
        return new NextResponse("Server ID Missing", { status: 400 });
      }

      const currentserver=await Server.findByIdAndUpdate(
        params.serverId,
        {
          inviteCode:uuidv4()
        }
      )
     return NextResponse.json(currentserver);

    } catch (error) {
      console.log("[SERVER_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}