"use client"
import axios from 'axios';
import {redirectToSignIn } from "@clerk/nextjs";
const ServerPage = ({params}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverId = params.servers;
         
      console.log({ serverId });

      await axios.delete(`/api/servers/${serverId}`);
      console.log("Server is deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      Server Page
      <button onClick={handleSubmit}>Delete</button>
    </div>
  );
};

export default ServerPage;
