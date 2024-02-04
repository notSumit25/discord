// import { NextApiRequest } from "next";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { connect } from "./db";
import { Server } from "@/models/serverModel";
export const currentUsers = async (req) => {
  const user= await currentUser();
  // console.log(user)
  if (!user) {
    return null;
  }
  const userm = await User.findOne({ userId: user.id });
  // console.log(userm);
  if(!userm)
  {
    return null;
  }
  return userm;
};

export const currentServerId=async(req)=>{
  const user= await currentUser();
  // console.log(user)
  if (!user) {
    return null;
  }
  const server = await Server.findOne({ ServerAdmin: user.id });
  // console.log(server);
  if(!server)
  {
    return null;
  }
  return server._id;
}
