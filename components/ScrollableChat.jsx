'use client'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ message, user }) => {
  const isSameSender = (m) => m.sender === user;

  return (
      <ScrollableFeed>
          <div className="flex flex-col-reverse flex-1 overflow-y-auto scrollbar-hide p-4">
              {message.map((m, i) => (
                  <div key={i} className="mb-2">
                      <div className={`flex ${isSameSender(m) ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-2 rounded ${isSameSender(m) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                              {m.content}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </ScrollableFeed>
  );
}

export default ScrollableChat;
