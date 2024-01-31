import Chat from "@/components/Chat";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { User } from "@/models/userModel";

const page = async({params}) => {
  const user = await currentUser();
  const userm = await User.findOne({ userId: user.id });

  const userId=userm._id;

  return (
    <div className="h-full w-full bg-inherit">
      <Chat params={params} user={userId} />
    </div>
  );
};

export default page;
