import React from 'react'
import Modal from './InviteModal'
import Dropdown from './DropDown'
import { Channel } from '@/models/channelModel'
import { FetchChannel } from '@/lib/fetch'

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
              </button>
             ))}
         
    </div>
  )
}

export default ServerSideBar
