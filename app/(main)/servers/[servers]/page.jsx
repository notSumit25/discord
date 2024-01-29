import { currentUsers } from "@/lib/currentUser";
import { FetchChannel } from "@/lib/fetch";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerPage = async ({ params }) => {
  const profile = await currentUsers();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await FetchChannel(params.servers);
  const firstChannel = server[0];
  // console.log(server);
  if (firstChannel) {
    return redirect(`/servers/${params.servers}/channels/${firstChannel._id}`);
  }else{
    return(
      <div>No Channel</div>
    );
  }
};

export default ServerPage;
