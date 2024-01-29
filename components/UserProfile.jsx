import React from "react";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
const UserProfile = async () => {
  const user = await currentUser();
  // console.log(user);
  return (
    <div className="w-full bg-zinc-900 flex items-center px-3 py-2 gap-2 rounded-md">
      <div className="flex w-full gap-2 items-center">
        <Image
          src={user.imageUrl}
          height={30}
          width={30}
          className="rounded-full"
          alt="User Image"
        />
        <span>{user.firstName}</span>
      </div>
      <EditProfileModal/>
    </div>
  );
};

export default UserProfile;
