import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";
import {User} from '@/models/userModel.js'
import { connect } from "./db";

export const currentUser=async(req)=>{
  const {userId}=getAuth(req)
  console.log(userId);
  if(!userId)
  {
    return null;
  }
   const user= await User.findOne({userid:userId})
    return user;
}