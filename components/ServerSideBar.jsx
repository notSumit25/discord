import React from "react";
import Modal from "./InviteModal";
import Dropdown from "./DropDown";
import { Channel } from "@/models/channelModel";
import { FetchChannel } from "@/lib/fetch";
import UserProfile from "./UserProfile";

const ServerSideBar = async ({ name, code, param }) => {
  const TextChannels = await FetchChannel(param);

  return (
    <div className="flex flex-col bg-[#2b2d31] w-full min-h-screen p-2 justify-between">
      <Dropdown name={name} code={code} param={param} />
      <div className="w-full h-auto flex flex-col justify-start flex-grow">
        {TextChannels.length > 0 && (
          <div className="text-sm mt-6 text-zinc-300 font-semibold">
            TEXT CHANNELS
          </div>
        )}
        {TextChannels.map((item) => (
          <button
            key={item._id}
            className="p-2 mb-3 text-center font-sans  bg-[#3c3c3c] text-large"
          >
            #{item.channelName}
          </button>
        ))}
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSideBar;
