"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const AdminModal = ({ServerId,userId}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [invitModal,setInviteModal]=useState(false);
  const [role,setRole]=useState("")
  const handleKick = async (e) => {
    e.preventDefault();
    try {
     const respone= await axios.patch(`/api/servers/${ServerId}/role`,{
        userId:userId
    }).then(()=>{
      setInviteModal(false)
      setShowModal(false)
      router.refresh();
      window.location.reload();
    })
    
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      
      await axios.post(`/api/servers/${ServerId}/role`,{
        role:role,
        userId:userId
      }).then(()=>{
        setInviteModal(false)
        setShowModal(false)
        router.refresh();
        window.location.reload();
      })
      
        
  }catch(e){
      console.log(e);
  }
  }


  const handleCloseModal = (e) => {
    if (e.target.id === 'wrapper') {
      setShowModal(false);
      setInviteModal(false);
    }
  };
  const handleInviteModal=async (e)=>{
    setShowModal(false);
    setInviteModal(true);
  }
const handleModal=async(e)=>{
  setShowModal(false);
  setInviteModal(false);

}
  return (
    <div>
       <div
        className="w-5 h-5 rounded-full bg-[#313338] text-[#249e57] flex items-center justify-center hover:bg-[#249e57] hover:text-[#313338] cursor-pointer transition-transform transform hover:scale-110"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 font-bold"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>


      {invitModal && (
        <div
          className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
          id="wrapper"
          onClick={handleCloseModal}
        >
          <div className="w-[600px] flex flex-col">
            <div className="bg-gray-800 rounded  h-[270px]">
              <h1 className='text-white text-center p-3 m-2 text-2xl font-bold' >Assign A Role </h1>
              
               <form className='flex flex-col p-2 m-1'>
                 <label htmlFor='ini'  className='text-white text-large font-semibold'>Role</label>
                 <input type='text' placeholder='Invite code'className='bg-black-200 rounded text-black h-[30px]' value={role} onChange={(e) => setRole(e.target.value)} />
               </form>
              <button className='h-[50px] w-[580px] p-2 m-2  bg-gray-800 hover:bg-gray-700  hover:text-white' onClick={handleSubmit} >Submit</button>
            </div>
          </div>
        </div>
      )}
       {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
          id="wrapper"
          onClick={handleCloseModal}
        >
          <div className="w-[600px] flex flex-col">
            <div className="bg-gray-600 rounded  h-[350px]">
              <h1 className='text-white text-center p-3 m-2 text-2xl font-bold' > Admin Modal</h1>
              <p className='text-white text-center p-2 m-1 text-lg '>Kick Member</p>
              <button className='h-[50px] w-[580px] p-2 m-2 rounded bg-gray-800 hover:bg-black hover:text-white' onClick={handleKick}>Kick Member</button>
              <p className='text-white text-center p-2 m-1 text-lg '>Assign a Role?</p>
              <button className='h-[50px] w-[580px] p-2 m-2  bg-gray-800 hover:bg-gray-700  hover:text-white' onClick={handleInviteModal}>Click to assign role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminModal
