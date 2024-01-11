import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { User } from "@/models/userModel";

import { connect } from "./db";

export const existingUser = async () => {
  const user = await currentUser();
  await connect();
  if (!user) {
    return redirectToSignIn();
  }
  try {
    const profile = await User.findOne({ userId: user.id});

    if (profile) {
      return profile;
    }
    const newProfile = await User.create({
      userId: user.id,
      username: user.firstName,
      email: user.emailAddresses[0].emailAddress,
      pic: user.imageUrl,
      isAdmin: false,
    });
    console.log('Success')
    return newProfile;
  } catch (error) {
    console.error("Error fetching or creating user profile:", error);
    // Handle the error appropriately, e.g., redirect to an error page
    return null;
  }
};
