'use client'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({message,user}) => {
    const isSameSender=(message,m,i,user)=>{
        console.log(user);
        console.log(m.sender);
         return (m.sender === user)
    }

  return (
    <ScrollableFeed>
      {/* Chat messages */}
      <div className="flex flex-col-reverse flex-1 overflow-y-auto p-4">
        {message.map((message,m, i) => (
          <div key={i} className="mb-2">
            <div className={`flex ${isSameSender(message, m, i,user) ? 'justify-start' : 'justify-end'}`}>
              <div className={`p-2 bg-gray-300 rounded ${isSameSender(message, m, i,user) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

    </ScrollableFeed>
  )
}

export default ScrollableChat
