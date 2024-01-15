import {connect} from '@/lib/db'
import { Server } from "@/models/serverModel.js";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel.js";


import { currentUsers } from "@/lib/currentUser";


await connect();
export async function PATCH(req,{params}) {
  try {
    console.log(params.inviteCode);
    console.log(1);
    const profile = await currentUsers();
    if (!profile) {
      return new NextResponse({message: "Internal Error"}, { status: 500 });
    }
    if (!params.invitecode) {
      return new NextResponse({message: "Internal Error"}, { status: 500 });
    }
    const exist = await Server.findOne({
      inviteCode: params.invitecode,
      users: { $elemMatch: { userId: profile.userId } } // Use $elemMatch for nested array search
    });
    console.log(exist);
    if (exist) {
        return new NextResponse({message:"server is already added successfully"})
      }
    console.log("you are in server")
    const server = await Server.findOneAndUpdate(
        { inviteCode: params.invitecode },
        { $push: { users: { userId: profile.userId, role: "Member" } } },
        { new: true }
    )
    return new NextResponse({message:"server added successfully"})
  } catch (error) {
    console.log('Axios Error:', error.response || error.request || error.message);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}