// pages/index.js
'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Real-Time Chat</h1>
      <div className="flex-grow overflow-y-auto mb-4 bg-white rounded shadow p-4">
        {messages.map((message, index) => (
          <div key={index} className="p-2 rounded bg-blue-100 mb-2">{message}</div>
        ))}
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow rounded border-gray-300 p-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white rounded px-4 py-2">Send</button>
      </div>
    </div>
  );
};

export default Index;