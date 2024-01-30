import ServerSideBar from "@/components/ServerSideBar";
import { currentUsers } from "@/lib/currentUser";
import { Server } from "@/models/serverModel";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ChannelLayout({children, params}){
    const profile = await currentUsers();
    if(!profile){
        return redirectToSignIn();
    }
    const server = await Server.findOne({_id:params.servers})
    const users = await Server.findOne({_id:params.servers}).populate('users.userId');
    const usersinfo=await users.users;
    //members
    const member=usersinfo.filter(user=> user.role =='Member')
    const Member = member.map(user => user.userId.username);
    //admin
    const admin=usersinfo.filter(user=> user.role =='Admin')
    const Admin = admin.map(user => user.userId.username);
    console.log(Member)
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
            <div className="min-h-screen flex flex-col w-60 bg-[#2b2d31] sticky items-center py-4">
                {Member.length>0 && (
                    <div>
                         Members
                         {Member.map((item)=>(
                        <div key={item}>
                           {item}
                        </div>
                      ))}
                    </div>
                )}
               {Admin.length>0 && (
                    <div>
                          
               Admin
               {Admin.map((item)=>(
               <div key={item}>
                  {item}
               </div>
             ))}
                    </div>
                )}
            </div>
            
        </div>
    )
}