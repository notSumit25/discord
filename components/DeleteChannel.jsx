"use client"
import React from 'react'
import axios from 'axios'


const DeleteChannel = ({channelId}) => {

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

  return (
    <button className='ml-4' onClick={handleDelete}>
       ➖      
    </button>
  )
}

export default DeleteChannel
