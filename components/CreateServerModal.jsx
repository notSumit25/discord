"use client"
import React, { useState } from 'react';

const CreateServerModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = (e) => {
    if (e.target.id === 'wrapper') setShowModal(false);
  };

  return (
    <div>
      <div
        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
          id="wrapper"
          onClick={handleCloseModal}
        >
          <div className="w-[600px] flex flex-col">
            <div className="bg-gray-600 rounded  h-[350px]">
              <h1 className='text-white text-center p-3 m-2 text-2xl font-bold' >Create Your Server</h1>
              <p className='text-white text-center p-2 m-1 text-lg '>Your Server is Where you and your Friends HangOut. Make Yours and start talking</p>
              <button className='h-[50px] w-[580px] p-2 m-2 rounded bg-gray-800 hover:bg-black hover:text-white'>Create My Own</button>
              <p className='text-white text-center p-2 m-1 text-lg '>Have a Invite Code ?</p>
              <button className='h-[50px] w-[580px] p-2 m-2  bg-gray-800 hover:bg-gray-700  hover:text-white'>Join Server</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateServerModal;
