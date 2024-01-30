"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const DeleteChannel = ({channelId}) => {
      
    const [name,setName]=useState("")
    const [Modal,setModal]=useState(false);
    const [type,setType]=useState('')
    const [showModal,setShowModal]=useState(false)
    const handleDelete=async(e)=>{
        e.preventDefault();
        try {
            await axios.delete(`/api/channels/${channelId}`).then(()=>{
                console.log("Channel Deleted")
                window.location.reload();
                setModal(false);
                setShowModal(false);
            });
           
        } catch (error) {
         console.log(error);   
        }
    }
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          console.log(name,type);
            await axios.patch(`/api/channels/${channelId}`,{
                name:name,
                type:type
            }).then(()=>{
                console.log("Channel Edited")
                window.location.reload();
                setModal(false);
                setShowModal(false);
            });
           
        } catch (error) {
         console.log(error);   
        }
    }
    const handleCloseModal = (e) => {
        if (e.target.id === 'wrapper') {
          setModal(false);
          setShowModal(false);
        }
      };

    const handleEdit=(e)=>{
        e.preventDefault();
        setShowModal(false);
       setModal(true)
    }
   const Openmodal=(e)=>{
    e.preventDefault();
    setModal(false);
    setShowModal(true);
   }
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        display='inline'
        onClick={Openmodal}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
          id="wrapper"
          onClick={handleCloseModal}
        >
          <div className="w-[600px] flex flex-col">
            <div className="bg-gray-600 rounded  h-[340px]">
              <h1 className='text-gray-300 text-center p-3 m-2 text-3xl font-bold ' >Channel Menu</h1>
              <p className='text-gray-400 text-left p-2 m-1 text-lg '>DeleteChannel</p>
              <button className='h-[50px] w-[580px] p-2 m-2 rounded bg-gray-800 hover:bg-black hover:text-white font-sans' onClick={handleDelete}>Delete Channel</button>
              <p className='text-gray-400 text-left p-2 m-1 text-lg font-sans '>Edit Channel</p>
              <button className='h-[50px] w-[580px] p-2 m-2  bg-gray-800 hover:bg-gray-700  hover:text-white' onClick={handleEdit}>Edit Channel</button>
            </div>
          </div>
        </div>
      )}
    {Modal && (
        <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center  rounded text-gray-400"
        id="wrapper"
        onClick={handleCloseModal}
      >
        <div className=" md:max-w-screen flex flex-col">
          <div className="bg-gray-800 rounded  md:max-h-screen w-[750px]">
            <h1 className=' text-center p-3 m-2 text-2xl font-bold' >Edit Your Channel</h1>
                <form className="flex flex-col p-2 w-[700px] gap-2 m-3" >
                <label className='text-left'>Channel Name</label>
                <input placeholder="Enter Channel Name" className="text-black px-2 py-1 my-4" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" />
                <select value={type} onChange={(e)=>{setType(e.target.value)}} className="text-black px-2 py-1" name="Type" id="Type">
                    <option value="TEXT">TEXT</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                </select>
                <button className="px-4 py-2 rounded bg-green-400 w-40 text-white mt-3 mx-auto" onClick={handleSubmit}>
    Submit
  </button>
               
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
