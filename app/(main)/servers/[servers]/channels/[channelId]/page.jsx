import Chat from "@/components/Chat";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel";
import { Channel } from "@/models/channelModel";

const page = async({params}) => {
  const user = await currentUser();
  const userm = await User.findOne({ userId: user.id });
  const channel = await Channel.findOne({ _id: params.channelId });
  // console.log(channel);
  const userId=userm._id.toString();

  return (
    <div className="w-full">
      <div className="border-b-2 w-[990px] border-black h-12 py-7 fixed top-0 z-10 bg-[#313338] flex items-center pl-4">#   {channel.channelName}</div>
      <Chat params={params} user={userId} />
    </div>
  );
};

export default page;
