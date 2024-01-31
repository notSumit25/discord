import Chat from '@/components/Chat'
import React from 'react'

const page = ({params}) => {
  return (
    <div className='h-full w-full bg-inherit'>
      <Chat params={params}/>
    </div>
  )
}

export default page
