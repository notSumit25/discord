import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";
import { Server } from "@/models/serverModel";
import { connect } from "./db";
import { existingUser } from "@/lib/Current";
import { Message } from "@/models/messageModel";

export const isSameSender = async (message,m,i) => {
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id }).populate("channel");
    if (!userm) {
      return new NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    return (
        (m.sender._id === userm._id)
    )
  };