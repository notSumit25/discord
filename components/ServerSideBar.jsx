import React from 'react'
import Modal from './InviteModal'
import Dropdown from './DropDown'

const ServerSideBar = ({name, code,param}) => {
  return (
    <div className='flex flex-col bg-[#2b2d31] w-full min-h-screen p-2'>
        <Dropdown name={name} code={code} param={param} />
    </div>
  )
}

export default ServerSideBar
