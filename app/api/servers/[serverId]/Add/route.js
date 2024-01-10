import {v4 as uuidv4} from 'uuid'
import { NextResponse } from 'next/server'
import { Server } from '@/models/serverModel';
import { currentUser } from '@/lib/currentUser'

//add current user in server
export async function PATCH(req,{params}){
    try {
        const profile = await currentProfile();
       const {serverId}={params}
       if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!serverId) {
        return new NextResponse("Server ID Missing", { status: 400 });
      }

      const currentserver=await Server.findByIdAndUpdate(
        serverId,
        {users:profile}
     )
     return NextResponse.json(currentserver);

    } catch (error) {
      console.log("[SERVER_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}