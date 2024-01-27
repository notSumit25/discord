import {connect} from '@/lib/db'
import { Server } from "@/models/serverModel.js";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel.js";
import { auth, currentUser } from "@clerk/nextjs";

import { currentUsers } from "@/lib/currentUser";


await connect();
export async function PATCH(req,{params}) {
  try {
    const profile = await currentUsers();
    if (!profile) {
      return new NextResponse({message: "Internal Error"}, { status: 500 });
    }
    if (!params.invitecode) {
      return new NextResponse({message: "Internal Error"}, { status: 500 });
    }
    // console.log(profile._id)
    const exist = await Server.findOne({
      inviteCode: params.invitecode,
      users: { $elemMatch: { userId: profile._id } } // Use $elemMatch for nested array search
    });
    // console.log(exist);
    if (exist) {
        return new NextResponse({message:"server is already added successfully"})
      }
    const server = await Server.findOneAndUpdate(
        { inviteCode: params.invitecode },
        { $push: { users: { userId: profile._id, role: "Member" } } },
        { new: true }
    )
    const user = await currentUser();
    const User_server_update = await User.findOneAndUpdate(
      { userId: user.id },
      {
        $push: { server: server }
      }
    );  
    return new NextResponse({message:"server added successfully"})
  } catch (error) {
    console.log('Axios Error:', error.response || error.request || error.message);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}