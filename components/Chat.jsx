'use client'
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import { io } from "socket.io-client";
import Image from "next/image";

const Chat = ({ params, user, clerkUser }) => {
  const [socket, setSocket] = useState(undefined);
  const [Chat, setChat] = useState("");
  const { servers, channelId } = params;
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      socket.emit("send message", channelId, Chat, clerkUser, user);
      const newMessage = {
        content: Chat,
        senderName: user,
        senderImage: clerkUser,
      };
      setMessages((messages) => [...messages, newMessage]);
      setChat("");
    }
  };

  const fetchChats = async () => {
    try {
      const response = await axios.put("/api/message", {
        channel: channelId,
      });
      setMessages((messages) => [...messages, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
    socket.emit("joinRoom", channelId);
    socket.on("chat message", (Chat, pic, user) => {
      const newMessage = { content: Chat, senderName: user, senderImage: pic };
      setMessages((messages) => [...messages, newMessage]);
    });
    inputRef.current.focus();
    fetchChats();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex-grow">
        <ScrollableFeed>
          <div className="flex flex-col-reverse flex-1 overflow-y-auto p-4 min-h-screen pb-12 bottom-10">
            {messages
              .slice(0)
              .reverse()
              .map((m, i) => (
                <div key={i} className="mb-2 flex flex-col">
                  <div className="flex justify-start">
                    <Image
                      width={100}
                      height={100}
                      alt="pic"
                      src={m.senderImage}
                      className="h-8 w-8 bg-gray-500 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-sans text-slate-300 font-thin">
                        {m.senderName}
                      </div>
                      <div className="p-2 rounded bg-gray-300 text-black">
                        {m.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ScrollableFeed>
      </div>
      <input
        type="text"
        ref={inputRef}
        value={Chat}
        className="w-[850px] p-4 m-2 mb-3 bg-gray-600 rounded h-[15px] fixed bottom-0 mt-2"
        placeholder="#Message"
        onChange={(e) => setChat(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Chat;