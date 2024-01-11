import { NextApiRequest } from "next";
import { auth } from "@clerk/nextjs";
import { User } from "@/models/userModel.js";
import { connect } from "./db";

export const currentUsers = async (req) => {
  const { userId } = auth();
  console.log(userId);
  if (!userId) {
    return null;
  }
  const user = await User.findOne({ userId: userId });
  return user;
};
