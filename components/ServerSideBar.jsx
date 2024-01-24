import React from 'react'
import Modal from './InviteModal'
import Dropdown from './DropDown'
import { Channel } from '@/models/channelModel'

const ServerSideBar = async ({name, code,param}) => {
  const getChannels=async()=>{
    try {
      const TextChannel=await axios.get(`api/channels`);
      console.log(TextChannel);
    } catch (error) {
      console.log(error);
    }
  }
  const TextChannel=getChannels();
  console.log(TextChannel)
  return (
    <div className='flex flex-col bg-[#2b2d31] w-full min-h-screen p-2'>
        <Dropdown name={name} code={code} param={param} />
          
    </div>
  )
}

export default ServerSideBar
