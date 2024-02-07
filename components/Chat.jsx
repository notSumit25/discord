'use client'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import ScrollableFeed from 'react-scrollable-feed'
import { io } from 'socket.io-client';

const Chat = ({params,user}) => { 
  const isSameSender = (m, user) => {
    return m.sender === user;
  }
  const [socket,setSocket]=useState(undefined);

 


  const [Chat,setChat]=useState("");
  const {servers,channelId}=params;//serverID ,ChannelId
  const [message,setMessage]=useState([])
  const [sendermessage,setsendermessage]=useState([])
  const [receivermsg,setreceivermsg]=useState([])


  const handleKeyPress = async(e) => {
    if (e.key === 'Enter') {
      console.log(channelId);
      socket.emit("message",Chat);
      setsendermessage([...sendermessage,Chat]);
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
  
   useEffect(() => {
    const socket=io('http://localhost:3001');
    setSocket(socket)
    socket.on('message sent', (Chat) => {
      console.log(Chat,"real time")
      setreceivermsg([...receivermsg,Chat])
    });
  }, []);
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
   
   
  return (
    <div className='flex flex-col min-h-screen relative'>
    <div className="flex-grow">
    <ScrollableFeed >
      <div className="flex flex-col-reverse flex-1 overflow-y-auto p-4 min-h-screen pb-12 bottom-10">
        {message.slice(0).reverse().map((m, i) => (
          <div key={i} className="mb-2 flex flex-col">
            <div className={`flex justify-start'}`}>
              <div className={`p-2 rounded ${isSameSender(m, user) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
         {sendermessage.map((m,i)=>{
           <div key={i} className="mb-2 flex flex-col">
           <div className={'flex justify-start'}>
             <div className={`p-2 rounded bg-blue-500 text-white`}>
               {m}
             </div>
           </div>
         </div>
         })}
        {receivermsg.map((m, i) => (
  <div key={i} className="mb-2 flex flex-col">
    <div className="flex justify-start">
      <div className="p-2 rounded bg-gray-300 text-black">
        {m}
      </div>
    </div>
  </div>
))}
      </div>
    </ScrollableFeed>
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
