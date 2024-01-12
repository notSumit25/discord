'use client'

import React, { useEffect, useRef, useState } from "react";
const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);
  const modal = useRef(null);
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
      <div className="w-full h-10 bg-inherit text-white shadow-lg text-center">
        <button
          ref={trigger}
          onClick={() => setModalOpen(true)}
          className={`rounded-full bg-inherit px-6 py-3 text-base font-medium text-white`}
        >
          Open Modal
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
            className="w-full max-w-[570px] rounded-[20px] bg-[#1e1f22] px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              Invite Friends to this Server
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
            ></span>
            <div className="bg-white text-black h-12 rounded-md px-4 py-2">

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
