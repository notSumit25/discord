import { UserButton } from "@clerk/nextjs";

const SideBar = () => {
  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-2 py-3 bg-inherit justify-between">
      <div className="w-full flex flex-col items-center gap-3 py-3">
        <div className="w-10 h-10 rounded-full bg-white"></div>
        <div className="w-10 h-10 rounded-full bg-white"></div>
        <div className="w-10 h-10 rounded-full bg-white"></div>
      </div>
      <div className="mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default SideBar;
