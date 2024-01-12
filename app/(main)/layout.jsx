import SideBar from "@/components/SideBar";
import { Server } from "@/models/serverModel";
export default function ServerLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#313338] text-white">
      <div className="min-h-screen bg-[#1e1f22] w-16  flex fixed">
        <SideBar />
      </div>
      <main className="md:pl-16 h-full ">{children}</main>
    </div>
  );
}
