'use client'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";


const Chat = ({params}) => {
  const [Chat,setChat]=useState("");
  const {servers,channelId}=params;
 console.log(servers,channelId)//serverID ,ChannelId
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const fetchats =async(e)=>{
      e.preventDefault();
      try{
         
      }
      catch(error){
          console.log(error);
      }
    }
   
  return (
    <div className='flex flex-col h-screen '>
    <div class="flex-grow">

    </div>
    <input
      type='text'
      ref={inputRef}
      value={Chat}
      className="w-[850px] p-4 m-2 mb-3 bg-gray-600 rounded h-[15px]"
      placeholder="#Message"
      onChange={(e) => setChat(e.target.value)}
    />
    </div>
  )
}

export default Chat
