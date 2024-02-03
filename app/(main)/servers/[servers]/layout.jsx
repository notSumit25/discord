import ServerSideBar from "@/components/ServerSideBar";
import { currentUsers } from "@/lib/currentUser";
import { Server } from "@/models/serverModel";
import { redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ChannelLayout({children, params}){
    const profile = await currentUsers();
    if(!profile){
        return redirectToSignIn();
    }
    const server = await Server.findOne({_id:params.servers})
    const users = await Server.findOne({_id:params.servers}).populate('users.userId');
    const usersinfo=await users.users;
    const member = usersinfo.filter(user => user.role === 'Member');
    const Member = member.map(user => ({
        username: user.userId.username,
        pic: user.userId.pic,
        userId: user.userId._id,
    }));
    const admin = usersinfo.filter(user => user.role === 'Admin');
    const Admin = admin.map(user => ({
        username: user.userId.username,
        pic: user.userId.pic,
        userId: user.userId._id,
    }));
    // console.log(Member)
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
            <div className="min-h-screen flex flex-col w-60 bg-[#2b2d31] fixed right-0 items-start py-4 px-4 z-50 text-white">
            {Admin.length > 0 && (
                    <div className="my-4">
                        <h2 className="text-lg font-bold mb-2">Admin</h2>
                        {Admin.map((item) => (
                            <div key={item.userId} className="flex items-center mb-2">
                                <Image width={100} height={100} src={item.pic} className="h-8 w-8 bg-gray-500 rounded-full mr-2" />
                                <div>{item.username}</div>
                            </div>
                        ))}
                    </div>
                )}
                {Member.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold mb-2">Members</h2>
                        {Member.map((item) => (
                            <div key={item.userId} className="flex items-center mb-2">
                                <Image width={100} height={100} src={item.pic} className="h-8 w-8 bg-gray-500 rounded-full mr-2" />
                                <div>{item.username}</div>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
            
        </div>
    )
}