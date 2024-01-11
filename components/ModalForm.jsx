"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
// FileForm.js
import '@uploadthing/react/styles.css'
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
const ServerForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/servers',{
        servername: name,
        serverpic: image,
    })
    router.refresh();
    window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-20 p-8 bg-[#313338] rounded-md"
    >
      <h1 className="text-white font-bold text-center text-3xl mb-4">
        Create You Server
      </h1>
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-white text-center">
          Upload Image
        </label>
        <UploadDropzone
          endpoint="serverImage"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setImage(res?.[0].url)
            console.log(image);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          placeholder="Enter name for Server"
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create
      </button>
    </form>
  );
};

export default ServerForm;
