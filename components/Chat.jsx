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
        const fetchchat=()=>{
             fetchats();
        }
        fetchchat();
    }, []);
    const fetchats =async()=>{

      try{
        const response = await axios.put('/api/message', {
          channel: channelId
        });
        setMessage([...message, ...response.data]);
      }
      catch(error){
          console.log(error);
      }
    }
   const handleKeyPress = async(e) => {
    if (e.key === 'Enter') {
      console.log(channelId);
      const response = await axios.post('/api/message', {
        content: Chat,
        server: servers,
        channel: channelId
      });
      setChat("");
      // console.log(response.data);
      setMessage([...message, response.data]);
    }
  }
  return (
    <div className='flex flex-col min-h-screen relative'>
    <div className="flex-grow">
       <ScrollableChat message={message} user={user}/>
    </div>
    <input
      type='text'
      ref={inputRef}
      value={Chat}
      className="w-[850px] p-4 m-2 mb-3 bg-gray-600 rounded h-[15px] fixed bottom-0 mt-2"
      placeholder= '#Message'
      onChange={(e) => setChat(e.target.value)}
      onKeyDown={handleKeyPress}
    />
    </div>
  )
}

export default Chat
