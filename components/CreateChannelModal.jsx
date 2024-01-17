'use Client'
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const CreateChannel = ({param}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const trigger = useRef(null);
  const modal = useRef(null);

  const handleDelete = async(e)=>{
    e.preventDefault();
    try{
        await axios.delete(`/api/servers/${param}`)
        console.log("Server Deleted");
        setModalOpen(false);
    }catch(e){
        console.log(e);
    }
  }
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div className="w-full h-10 bg-inherit text-red-600 text-center hover:bg-red-600 hover:text-white py-2">
        <button
          ref={trigger}
          onClick={() => setModalOpen(true)}
          className={`rounded-full px-6 text-base font-medium`}
        >
          Delete Server
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
            className="w-full max-w-[630px] rounded-[20px] bg-[#1e1f22] px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            <form className="w-full flex flex-col p-2 mx-auto" onSubmit={handleSubmit}>
                <label>Channel Name</label>
                <input type="text" />
                <select name="Type" id="Type">
                    <option value="TEXT">TEXT</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                </select>
                <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChannel;
