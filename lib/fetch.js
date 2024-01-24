import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";

import { connect } from "./db";

export const FetchChannel = async () => {
    try{
        
        const user = await currentUser();
        const userm = await User.findOne({ userId: user.id }).populate("channel");
        if (!userm) {
          return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
        }
       const channels=await userm.channel;
        return channels;
      }
      catch(err)
      {
        console.log("[Channel_POST]", err);
      }
};
