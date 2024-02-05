import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import ServerForm from "@/components/ModalForm";
import { existingUser } from "@/lib/Current";
import { Server } from "@/models/serverModel";
import { redirect } from "next/navigation";
import { User } from "@/models/userModel";
export default async function Home() {
  const profile = await existingUser();
  // const server = await Server.findOne({
  //   ServerAdmin: profile.userId,
  // }).populate('server');
  const user = await User.findById(profile.id).populate('server');
  if (user && user.server && user.server.length > 0) {
    return redirect(`/servers/${user.server[0].id}`);
  }
  
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ServerForm />
    </div>
  );
}
