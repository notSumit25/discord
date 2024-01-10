import { NextApiRequest } from "next";
import {auth} from '@clerk/nextjs'
import {User} from '@/models/userModel.js'
import { connect } from "./db";

export const currentUser=async(req)=>{
  const {userId}=auth();
  console.log(userId);
  if(!userId)
  {
    return null;
  }
   const user= await User.findOne({userid:userId})
    return user;
}