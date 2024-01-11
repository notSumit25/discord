import { connect } from "@/lib/db.js";
import { Server } from "@/models/serverModel.js";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";

await connect();
export async function POST(req) {
  try {
    console.log("hey");
    const reqBody = await req.json();
    console.log(reqBody);
    const { servername, serverpic } = reqBody;
    const user = await currentUser();
    console.log(user);
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return NextResponse("Unauthorized", { status: 401 });
    }
    const newServer = new Server({
      ServerAdmin: user.id,
      users: userm,
      servername,
      serverpic,
    });
    console.log('Server Created Successfully')
    return NextResponse.json(newServer);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return NextResponse("Internal Error", { status: 500 });
  }
}
