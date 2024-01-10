import {connect} from '@/lib/db.js'
import { Server } from '@/models/serverModel.js'
import { NextRequest,NextResponse } from 'next/server'
import {auth,currentUser} from '@clerk/nextjs'
import {User} from '@/models/userModel.js'
import { v4 as uuidv4 } from "uuid";

await connect()
//create new server
export async function POST(req){
    try {
        console.log("hey");
        const reqBody=await req.json()
        const {servername,serverpic}=reqBody;
        console.log(servername)
        const user = await currentUser();
        const userm=await User.findOne({userid:user.id});
        if(!userm)
        {
            return NextResponse("Unauthorized",{status:401});
        }
        const newserver=new Server({
            ServerAdmin:user.id,
            users:userm,
            servername,
            serverpic
        })
        return NextResponse.json(newserver);

    } catch (error) {
        console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });   
    }
}