import { currentUsers } from '@/lib/currentUser';
import { FetchChannel } from '@/lib/fetch';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const ServerPage = async ({ params: { servers } }) => {
  try {
    const profile = await currentUsers();
    if (!profile) {
      return redirectToSignIn();
    }

    const server = await FetchChannel(servers);
    const firstChannel = server[0];

    if (firstChannel) {
      return redirect(`/servers/${servers}/channels/${firstChannel._id}`);
    } else {
      return <div>No Channel</div>;
    }
  } catch (error) {
    console.error(error);
  }
};

export default ServerPage;