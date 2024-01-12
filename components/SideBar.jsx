import { existingUser } from "@/lib/Current";
import { connect } from "@/lib/db";
import { Server } from "@/models/serverModel";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const SideBar = async () => {
  await connect();
  const profile = await existingUser();
  if (!profile) {
    return redirectToSignIn();
  }
  const servers = await Server.find({ ServerAdmin: profile.userId });
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
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            className="font-bold"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <div className="mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default SideBar;
