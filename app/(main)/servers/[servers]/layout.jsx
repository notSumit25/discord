import AdminModal from "@/components/AdminModal";
import ServerSideBar from "@/components/ServerSideBar";
import { currentUsers } from "@/lib/currentUser";
import { Server } from "@/models/serverModel";
import { redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ChannelLayout({children, params}){
    const profile = await currentUsers();
    const userc=await currentUser();
    if(!profile){
        return redirectToSignIn();
    }
    const isadmin=await Server.exists({_id:params.servers,ServerAdmin:userc.id})
    const server = await Server.findOne({_id:params.servers})
    const users = await Server.findOne({_id:params.servers}).populate('users.userId');
    const usersinfo=await users.users;
    const member = usersinfo.filter(user => user.role === 'Member');
    // console.log(member)
    const Member = member.map(user => ({
        username: user.userId.username,
        pic: user.userId.pic,
        userId: user.userId._id,
        SpecialRole:user.SpecialRole
    }));
    const admin = usersinfo.filter(user => user.role === 'Admin');
    // console.log(admin)
    const Admin = admin.map(user => ({
        username: user.userId?.username,
        pic: user.userId?.pic,
        userId: user.userId?._id,
    }));
    // console.log(Member);
    if(!server){
        return redirect('/');
    }

    return(
        <div className="min-h-screen w-full flex  justify-between">
            <div className="min-h-screen flex flex-col fixed w-60">
                <ServerSideBar name={server.servername} code={server.inviteCode} param={params.servers} />
            </div>
            <main className="md:pl-60 min-h-screen">
                {children}
            </main>
            <div className="min-h-screen flex flex-col w-60 bg-[#2b2d31] fixed right-0 items-start py-4 px-4 z-30 text-white">
            {Admin.length > 0 && (
                    <div className="my-4">
                        <h2 className="text-lg font-bold mb-2">Admin</h2>
                        {Admin.map((item) => (
                            <div key={item.userId} className="flex items-center mb-2">
                                <Image width={100} height={100} src={item.pic} alt="Admin Image" className="h-8 w-8 bg-gray-500 rounded-full mr-2" />
                                <div className="m-2">{item.username}</div>
                                <span className="m-2 text-gray-400  ">{item.SpecialRole}</span>
                            </div>
                        ))}
                    </div>
                )}
                {Member.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Members</h2>
                        {Member.map((item) => (
                            <div key={item.userId} className="flex items-center mb-2">
                                <Image width={100} height={100} src={item.pic} alt="Members Image" className="h-8 w-8 bg-gray-500 rounded-full mr-2" />
                                <div>{item.username}</div>
                                {isadmin && <AdminModal ServerId={params.servers} userId={item.userId.toString()}/>}
                                <span className="m-2 text-gray-400">{item.SpecialRole}</span>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
            
        </div>
    )
}