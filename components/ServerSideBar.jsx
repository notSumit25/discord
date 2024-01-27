<<<<<<< HEAD
import React from "react";
import Modal from "./InviteModal";
import Dropdown from "./DropDown";
import { Channel } from "@/models/channelModel";
import { FetchChannel } from "@/lib/fetch";
import UserProfile from "./UserProfile";

const ServerSideBar = async ({ name, code, param }) => {
  const TextChannels = await FetchChannel();

  return (
    <div className="flex flex-col bg-[#2b2d31] w-full min-h-screen p-2 justify-between">
      <Dropdown name={name} code={code} param={param} />
      <div className="w-full h-full flex flex-col justify-start">
        {TextChannels.length > 0 && (
          <div className="text-sm mt-6 text-zinc-300 font-semibold">
            TEXT CHANNELS
          </div>
        )}
        {TextChannels.map((item) => (
          <button
            key={item._id}
            className="p-2 mb-3 text-center font-sans  bg-[#3c3c3c] text-large  "
          >
            #{item.channelName}
          </button>
        ))}
      </div>
      <UserProfile />
=======
import React from 'react'
import Modal from './InviteModal'
import Dropdown from './DropDown'
import { Channel } from '@/models/channelModel'
import { FetchChannel } from '@/lib/fetch'
import DeleteChannel from './DeleteChannel'

const ServerSideBar = async ({name, code,param}) => {
   const TextChannels = await FetchChannel(param);
  return (
    <div className='flex flex-col bg-[#2b2d31] w-full min-h-screen p-2'>
        <Dropdown name={name} code={code} param={param} />
          {TextChannels && (
            <div className='text-sm mt-6 text-zinc-300 font-semibold'>
                TEXT CHANNELS
            </div>
            
          )}
           {TextChannels && TextChannels.map((item)=>(
              <button key={item._id} className='p-2 mb-3 text-center font-sans text-stone-300  bg-[#151515e4] text-large rounded '>
                   #️⃣ {item.channelName} 
                    <DeleteChannel channelId={item._id}/>
                  
              </button>
             ))}
         
>>>>>>> 48e2f2857498634b2fcd1bc975ad03a6d9c5eae9
    </div>
  );
};

export default ServerSideBar;
