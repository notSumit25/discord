import Chat from "@/components/Chat";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel";
import { Channel } from "@/models/channelModel";
import VideoCall from "@/components/Video-call";

const page = async ({ params }) => {
  const user = await currentUser();
  const userm = await User.findOne({ userId: user.id });
  const channel = await Channel.findOne({ _id: params.channelId });
  // console.log(channel);
  const names = userm.username.toString();
  // console.log(names);
  const id = channel._id.toString();
  const userimage = user.imageUrl;
  const userId = userm._id.toString();


  return (
    <div className="w-full">
      <div className="border-b-2 w-[990px] border-black h-12 py-7 fixed top-0 z-10 bg-[#313338] flex items-center pl-4">
        # {channel.channelName}
      </div>
      {channel.type === "TEXT" && (
        <Chat params={params} user={userm.username} clerkUser={userimage} />
      )}
      {channel.type === "Video" && (
        <div className=" min-h-screen w-full">
          <VideoCall channelId={id} video={true} audio={true} names={names}/>
        </div>
      )}
      {channel.type === "Audio" && (
        <div className=" min-h-screen w-full">
          <VideoCall channelId={id} video={false} audio={true} />
        </div>
      )}
    </div>
  );
};

export default page;
