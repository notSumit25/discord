import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({message, user}) => {
  const isSameSender = (m, user) => {
    return m.sender === user;
  }

  return (
    <ScrollableFeed forceScroll={true}>
      <div className="flex flex-col-reverse flex-1 overflow-y-auto p-4 min-h-screen pb-12 bottom-10">
        {message.slice(0).reverse().map((m, i) => (
          <div key={i} className="mb-2 flex flex-col">
            <div className={`flex ${isSameSender(m, user) ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 rounded ${isSameSender(m, user) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollableFeed>
  )
}

export default ScrollableChat;