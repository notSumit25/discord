"use client"
import React, { useState } from 'react'
import axios from 'axios'


const DeleteChannel = ({channelId}) => {

    const [name,setName]=useState("")
    const [Modal,setModal]=useState(false);
    const [type,setType]=useState('')

    const handleDelete=async(e)=>{
        e.preventDefault();
        try {
            await axios.delete(`/api/channels/${channelId}`).then(()=>{
                console.log("Channel Deleted")
                window.location.reload();
            });
           
        } catch (error) {
         console.log(error);   
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.patch(`/api/channels/${channelId}`,{
                name:name,
                type:type
            }).then(()=>{
                console.log("Channel Edited")
                window.location.reload();
            });
           
        } catch (error) {
         console.log(error);   
        }
    }
    const handleCloseModal = (e) => {
        if (e.target.id === 'wrapper') {
          setModal(false);
        }
      };

    const handleEdit=(e)=>{
        e.preventDefault();
       setModal(true)
    }

  return (
    <span>
    <button className='ml-4' onClick={handleDelete}>
    ➖      
    </button>
    <button className='ml-2' onClick={handleEdit}>
     ➕
    </button>
    {Modal && (
        <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center  rounded text-gray-400"
        id="wrapper"
        onClick={handleCloseModal}
      >
        <div className=" md:max-w-screen flex flex-col">
          <div className="bg-gray-800 rounded  md:max-h-screen w-[750px]">
            <h1 className=' text-center p-3 m-2 text-2xl font-bold' >Edit Your Channel</h1>
                <form className="w-full flex flex-col p-2 w-[700px] gap-2 m-3" onSubmit={handleSubmit}>
                <label className='text-left'>Channel Name</label>
                <input placeholder="Enter Channel Name" className="text-black px-2 py-1 my-4" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" />
                <select value={type} onChange={(e)=>{setType(e.target.value)}} className="text-black px-2 py-1" name="Type" id="Type">
                    <option value="TEXT">TEXT</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                </select>
                <button className="px-4 py-2 rounded bg-green-400 w-40 text-white mt-3 mx-auto" type="submit">Submit</button>
            </form>
    
          </div>
        </div>
      </div>       
      )

      }
    </span>
  )
}

export default DeleteChannel
