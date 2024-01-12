import { connect } from "@/lib/db.js";
import { Server } from "@/models/serverModel.js";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";

await connect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { servername, serverpic } = reqBody;
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
    const newServer = await Server.create({
      ServerAdmin: user.id,
      users: userm,
      servername,
      serverpic,
    });
    await newServer.save()
    console.log('Server Created Successfully')
    return new NextResponse.json({newServer});
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}

export async function GET(req){
  try {
    await connect();
    const servers = await Server.find({});
    return new NextResponse(servers);
  } catch (error) {
    console.log("[SERVERS_GET]", error);
    return new NextResponse.json({message: "Internal Error"}, { status: 500 });
  }
}
