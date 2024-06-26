import { currentUsers } from "@/lib/currentUser";
import { Server } from "@/models/serverModel";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }) => {
  // console.log(params);
  const profile = await currentUsers();
  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.invitecode) {
    return redirect("/");
  }
  const exist = await Server.findOne({
    inviteCode: params.invitecode,
    users: { $elemMatch: { userId: profile.userId } } // Use $elemMatch for nested array search
  });
  // console.log(exist);
  // console.log("you are in server")
  if (exist) {
    return redirect(`/servers/${exist._id}`);
  }

  const server = await Server.findOneAndUpdate(
    { inviteCode: params.invitecode },
    { $push: { users: { userId: profile.userId, role: "Member" } } },
    { new: true }
  );
  // console.log(server);
  console.log("server added")
  if (server) {
    return redirect(`/servers/${server._id}`);
  }
  return null;
};

export default Page;