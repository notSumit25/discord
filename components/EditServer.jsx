"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
// FileForm.js
import '@uploadthing/react/styles.css'

const EditServer = ({param}) => {

  console.log(param)
  const [Modal,setModal]=useState(false);
     const [name,setName]=useState("")
     const [pic,setPic]=useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")

     const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.patch(`/api/servers/${param}`,{
              servername:name,
              serverpic:pic
            }).then(()=>{
              setModal(false);
            })

        }catch(err){

        }
     }
     const handleImageChange= (event) => {
      const file = event.target.files[0];
      if (file) {
        setPic(file);
      }
    };
    const handleCloseModal = (e) => {
        if (e.target.id === 'wrapper') {
          setModal(false);
        }
      };
   const Openmodal=(e)=>{
    e.preventDefault();
    setModal(true);
   }
  return (
    <div>
       <div className="w-full h-10 bg-inherit text-violet-500 text-center hover:bg-violet-500 hover:text-white py-2">
       <button
          onClick={() => Openmodal(true)}
          className={`rounded-full px-6 text-base font-medium`}
        >
          Edit Server
          {" "}
        </button>
       </div>
           {Modal && (
        <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center  rounded text-gray-400"
        id="wrapper"
        onClick={handleCloseModal}
      >
        <div className=" md:max-w-screen flex flex-col">
          <div className="bg-gray-800 rounded  md:max-h-screen">
            <h1 className=' text-center p-3 m-2 text-2xl font-bold' >Edit Your Profile</h1>
            <div className="flex flex-col m-3">
        <label htmlFor="file" className="block text-sm font-medium">
          Upload Image
        </label>
        <UploadDropzone
          endpoint="serverImage"
          onClientUploadComplete={(res) => {
            handleImageChange(res)
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

      </div>
      <div className="m-3 mt-4">
  <label htmlFor="name" className="block text-sm font-medium  m-1">
    Name
  </label>
  
  <input
    value={name}
    onChange={(e) => { setName(e.target.value) }}
    placeholder="Enter Name"
    type="text"
    id="name"
    name="name"
    className="p-2 w-[750px] border rounded-md text-black"
  />
</div>
      <div className='flex flex-col items-center justify-center'>
      <button
      onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded-md m-2"
      >
        Submit
      </button>
      </div>
          </div>
        </div>
      </div>       
      )

      }
    </div>
  )
}

export default EditServer
