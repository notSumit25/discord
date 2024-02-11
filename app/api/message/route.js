import { connect } from "@/lib/db.js";
import { Channel } from "@/models/channelModel";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import Server from 'next/server';
import { useParams } from "next/navigation";
import { Message } from "@/models/messageModel";
// import {json} from 'next'

await connect();
export async function POST(req) {
  try {
    const reqBody= await req.json();

    const { channel,server,content } = reqBody;
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
  
      const newMesage = await Message.create({
       sender:userm,
       content:content,
       server:server,
       channel:channel
      }
      );
      await newMesage.populate('sender');
      return Server.NextResponse.json(newMesage)
  } catch (error) {
    console.log("[Message_POST]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const reqBody= await req.json();
 
    const { channel} = reqBody;
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id });
    if (!userm) {
      return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
    }
   
    const messages = await Message.find({
    channel: channel,
    }).populate('sender');
  
      return Server.NextResponse.json(messages)
  } catch (error) {
    console.log("[Message_GET]", error);
    return new NextResponse({message: "Internal Error"}, { status: 500 });
  }
}