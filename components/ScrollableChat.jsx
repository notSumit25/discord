'use client'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({message,userId}) => {
    const isSameSender=(message,m,i,userId)=>{
        console.log(userId);
         return (m.sender === userId)
    }

  return (
    <ScrollableFeed>
      {message && message.map((m,i)=> (
        <div key={i} style={{display: 'flex'}}>
            {isSameSender(message,m,i,userId) && (
                <div flex-end text-white>
                      {m.content}
                </div>
            )}
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
