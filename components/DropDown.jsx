'use client'
import React, { useEffect, useRef, useState } from "react";
import Modal from "./InviteModal";
import InviteModal from "./InviteModal";
import DeleteServer from "./DeleteServer";
import CreateChannel from "./CreateChannelModal";
import axios from "axios";

// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
  let domNode = useRef();


  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};



const Dropdown = ({name,code,param}) => {
  
  const getChannels=async()=>{
    try {
      const TextChannel=await axios.get(`api/channels`);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    
  });


  const [dropdownOpen, setDropdownOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  return (
    <>
            <div ref={domNode} className="w-full shadow-lg">
              <div className="text-center">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`bg-primary flex items-center rounded-[5px] px-5 py-[13px] text-base font-medium text-white justify-between`}
                  >
                    {name}
                    <span className="pl-4">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                      >
                        <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`shadow-1 dark:shadow-box-dark absolute -left-7 z-40 mt-2 w-48 rounded-lg bg-black dark:bg-dark-2 transition-all ${
                      dropdownOpen
                        ? "top-full opacity-100 visible"
                        : "top-[110%] invisible opacity-0"
                    }`}
                  >
                    <InviteModal code={code} />
                    <DeleteServer param={param} />
                    <CreateChannel param={param} />
                  </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default Dropdown;
