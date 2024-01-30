import React from "react";
import Modal from "./InviteModal";
import Dropdown from "./DropDown";
import { Channel } from "@/models/channelModel";
import { FetchChannel } from "@/lib/fetch";
import UserProfile from "./UserProfile";
import DeleteChannel from "./DeleteChannel";
import Link from "next/link";

const ServerSideBar = async ({ name, code, param }) => {
  const TextChannels = await FetchChannel(param);
 

  return (
    <div className="flex flex-col bg-[#2b2d31] w-full min-h-screen p-2 justify-between">
      <Dropdown name={name} code={code} param={param} />
      <div className="w-full h-auto flex flex-col justify-start flex-grow">
        {TextChannels.length > 0 && (
          <div className="text-sm mt-6 mb-3 text-zinc-300 font-semibold">
            TEXT CHANNELS
          </div>
        )}
        {TextChannels.map((item) => (
          <Link
            key={item._id}
            href={`/servers/${param}/channels/${item._id}`}
            className="pl-4 py-2 w-full text-start font-sans text-large text-gray-400 flex  justify-between"
          >
            #  {item.channelName}
            <span> <DeleteChannel channelId={item._id.toJSON ? item._id.toJSON() : item._id} /></span>
          </Link>
        ))}
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSideBar;
