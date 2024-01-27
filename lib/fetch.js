import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";
import { Server } from "@/models/serverModel";
import { connect } from "./db";

export const FetchChannel = async (params) => {
    try{
         const serverId=params;
        const user = await currentUser();
        const userm = await User.findOne({ userId: user.id }).populate("channel");
        if (!userm) {
          return new NextResponse.json({message:"Unauthorized"}, { status: 401 });
        }
        const server=await Server.findById(serverId).populate('channels');
       const channels=await server.channels;
       console.log(channels);
        return channels;
      }
      catch(err)
      {
        console.log("[Channel_POST]", err);
      }
};
