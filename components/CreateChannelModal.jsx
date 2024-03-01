"use client"
import axios from "axios";
import React, { useState } from "react";

const CreateChannel = ({ param }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('TEXT');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/channels/`, { name, type, param });
      console.log("Channel Created");
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (e) => {
    if (e.target.id === 'wrapper') {
     setModalOpen(false)
    }
  };
  

  return (
    <>
      <div className="w-full h-10 bg-inherit text-green-600 text-center hover:bg-green-600 hover:text-white py-2">
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full px-6 text-base font-medium"
        >
          Add Channel
        </button>
      </div>

      {modalOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        id="wrapper"
        onClick={handleModal}
        >
          <div
            className=" wrapper-content z-999 w-full max-w-[630px] rounded-[20px] bg-[#1e1f22] px-8 py-12 text-center md:px-[70px] md:py-[60px]"

          >
            <div className="w-full flex flex-col p-2 mx-auto">
              <label>Channel Name</label>
              <input
                placeholder="Enter Channel Name"
                className="text-black px-2 py-1 my-4"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
           <div>
  <label className="mr-2">
    <input
      type="radio"
      value="TEXT"
      checked={type === 'TEXT'}
      onChange={() => setType('TEXT')}
      className="mr-1"
    />
    TEXT
  </label>
  <label className="mr-2">
    <input
      type="radio"
      value="Audio"
      checked={type === 'Audio'}
      onChange={() => setType('Audio')}
      className="mr-1"
    />
    Audio
  </label>
  <label className="mr-2">
    <input
      type="radio"
      value="Video"
      checked={type === 'Video'}
      onChange={() => setType('Video')}
      className="mr-1"
    />
    Video
  </label>
</div>

              <button
  type="button"
  className="px-4 py-2 rounded bg-green-400 w-40 text-white mt-3 mx-auto"
  onClick={handleSubmit}
>
  Submit
</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateChannel;
