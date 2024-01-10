import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";

export const existingUser = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  const profile = await User.findById(user._id);

  if (profile) {
    return profile;
  }
  const newProfile = await User.create({
    username: user.firstName,
    email: user.emailAddresses[0].emailAddress,
    pic: user.imageUrl,
    isAdmin: false,
  });
  return newProfile;
};
