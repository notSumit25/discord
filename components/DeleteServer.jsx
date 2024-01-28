'use Client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";


const DeleteServer = ({param}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const trigger = useRef(null);
  const modal = useRef(null);

  const handleDelete = async(e)=>{
    e.preventDefault();
    try{
        await axios.delete(`/api/servers/${param}`)
        console.log("Server Deleted");
        setModalOpen(false);
        router.refresh();
        window.location.reload();
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
            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
                Are You Sure You want to Delete The Server?
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
            ></span>
            <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
              This Action is not Reversible. All the Data Will be Lost Forever
            </p>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-violet-600 hover:bg-violet-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button onClick={handleDelete} className="block w-full rounded-md bg-red-600 p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark">
                    Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteServer;
