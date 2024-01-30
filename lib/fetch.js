import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";
import { Server } from "@/models/serverModel";
import { connect } from "./db";
import { existingUser } from "@/lib/Current";

export const FetchChannel = async (params) => {
  try {
    const serverId = params;
    // console.log(params);
    const user = await currentUser();
    const userm = await User.findOne({ userId: user.id }).populate("channel");
    if (!userm) {
      return new NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const server = await Server.findById(serverId).populate("channels");
    const channels = await server.channels;
    return channels;
  } catch (err) {
    console.log("[Channel_POST]", err);
  }
};
export const FetchServers = async () => {
  try {
    const profile = await existingUser();
  if (!profile) {
    return redirectToSignIn();
  }
  const user = await User.findById(profile.id).populate('server');
  const servers = user.server;
    return servers;
  } catch (err) {
    console.log("[Channel_POST]", err);
  }
};

export const FetchCurrentServer = async (params) => {
  try {
    const profile = await existingUser();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await Server.findById(params);
    return server;
  } catch (err) {
    console.log("[Channel_POST]", err);
  }
};