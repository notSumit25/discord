'use client'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import ScrollableChat from './ScrollableChat';

const Chat = ({params,user}) => {
  const [Chat,setChat]=useState("");
  const {servers,channelId}=params;//serverID ,ChannelId
  const [message,setMessage]=useState([])
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
   const handleKeyPress = async(e) => {
    if (e.key === 'Enter') {
      const response = await axios.post('/api/message', {
        content: Chat,
        server: servers,
        channel: channelId
      });
      setChat("");
      setMessage([...message, response.data]);
      console.log('Message is sent');
      console.log(message);
    }
  }
  return (
    <div className='flex flex-col h-screen '>
    <div class="flex-grow">
       <ScrollableChat message={message} userId={user}/>
    </div>
    <input
      type='text'
      ref={inputRef}
      value={Chat}
      className="w-[850px] p-4 m-2 mb-3 bg-gray-600 rounded h-[15px]"
      placeholder="#Message"
      onChange={(e) => setChat(e.target.value)}
      onKeyDown={handleKeyPress}
    />
    </div>
  )
}

export default Chat
