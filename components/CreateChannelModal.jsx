'use Client'
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const CreateChannel = ({param}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type,setType] = useState('');
  const trigger = useRef(null);
  const modal = useRef(null);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        // const ServerId=await currentServerId();
        await axios.post(`/api/channels/`,{name:name,type:type,param:param}).then(()=>{
          console.log("Channel Created");
          setModalOpen(false);
        })
    }catch(e){
        console.log(e);
    }
  }
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!modal.current) return;
  //     if (
  //       (!modalOpen && !trigger.current.contains(target)) ||
  //       (modal.current.contains(target) && !target.classList.contains("submit-button"))
  //     )
  //       return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // }, [modalOpen]);
  

  // // close if the esc key is pressed
  // useEffect(() => {
  //   const keyHandler = ({ keyCode }) => {
  //     if (!modalOpen || keyCode !== 27) return;
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("keydown", keyHandler);
  //   return () => document.removeEventListener("keydown", keyHandler);
  // });

  return (
    <>
      <div className="w-full h-10 bg-inherit text-green-600 text-center hover:bg-green-600 hover:text-white py-2">
        <button
          ref={trigger}
          onClick={() => setModalOpen(true)}
          className={`rounded-full px-6 text-base font-medium`}
        >
          Add Channel
        </button>
        <div
          className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full max-w-[630px] rounded-[20px] bg-[#1e1f22] px-8 py-12 text-center md:px-[70px] md:py-[60px]"
          >
            <form className="w-full flex flex-col p-2 mx-auto" onSubmit={handleSubmit}>
                <label>Channel Name</label>
                <input placeholder="Enter Channel Name" className="text-black px-2 py-1 my-4" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" />
                <select value={type} onChange={(e)=>{setType(e.target.value)}} className="text-black px-2 py-1" name="Type" id="Type">
                    <option value="Select">Select</option>
                    <option value="TEXT">TEXT</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                </select>
                <button className="px-4 py-2 rounded bg-green-400 w-40 text-white mt-3 mx-auto" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChannel;
