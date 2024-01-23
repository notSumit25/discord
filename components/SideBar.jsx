import { existingUser } from "@/lib/Current";
import { connect } from "@/lib/db";
import { Server } from "@/models/serverModel";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import CreateServerModal from "./CreateServerModal";
import { User } from "@/models/userModel";
import { currentUser } from "@clerk/nextjs";

const SideBar = async () => {
  await connect();
  const profile = await existingUser();
  if (!profile) {
    return redirectToSignIn();
  }
  const user = await User.findById(profile.id).populate('server');
  const servers = user.server;
  console.log(servers);
  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-2 py-3 bg-inherit justify-between">
      <div className="w-full flex flex-col items-center gap-3 py-3">
        {servers.map((server) => (
          <Link key={server._id} href={`/servers/${server.id}`}>
            <Image
              src={server.serverpic}
              width={40}
              height={40}
              className="rounded-full"
              alt="Serve Image"
            />
          </Link>
        ))}
        <div className="border-[1px] w-12" />
        <CreateServerModal/>
      </div>
      <div className="mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default SideBar;
