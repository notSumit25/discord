import {connect} from '@/lib/db.js'
import { Server } from '@/models/serverModel'
import { NextRequest,NextResponse } from 'next/server'
import {auth} from '@clerk/nextjs'
import { currentUser } from '@/lib/currentUser'
import { v4 as uuidv4 } from "uuid";
await connect()

//create new server
export async function POST(req){
    try {
        const reqBody=await req.json()
        const {servername,serverpic}=reqBody;
        const user=await currentUser();
        if(!user)
        {
            return NextResponse("Unauthorized",{status:401});
        }
        const newserver=new Server({
            ServerAdmin:user.userid,
            users:user,
            servername,
            serverpic,
            inviteCode:uuidv4(),
        })
        return NextResponse.json(newserver);

    } catch (error) {
        console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });   
    }
}