"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const EditProfileModal = () => {
     const [Modal,setModal]=useState(false);
     const [name,setName]=useState("")
     const [image,setImage]=useState("")

     const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.patch('/api/users',{
                username:name,
                pic:image
            }).then(()=>{
              setImage("");
              setModal(false);
              window.location.reload();
            })

        }catch(err){
          console.log('Edit Profile Modal: ',err);
        }
     }
     const handleImageChange= (event) => {
      const file = event.target.files[0];
      if (file) {
        setImage(file);
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
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
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
            console.log("Files: ", res);
            setImage(res?.[0].url);
            console.log(image);
            alert("Upload Completed");
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

export default EditProfileModal
