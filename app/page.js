import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import ServerForm from "@/components/ModalForm";
import { existingUser } from "@/lib/Current";
import { Server } from "@/models/serverModel";
import { redirect } from "next/navigation";
export default async function Home() {
  const profile = await existingUser();
  const server = await Server.findOne({
    ServerAdmin: profile.userId,
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ServerForm />
    </div>
  );
}
