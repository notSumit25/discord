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
    if(!server){
        return redirect('/');
    }

    return(
        <div className="min-h-screen w-full">
            <div className="min-h-screen flex flex-col fixed w-60">
                <ServerSideBar />
            </div>
            <main className="md:pl-60 min-h-screen">
                {children}
            </main>
        </div>
    )
}