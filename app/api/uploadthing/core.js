import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const {userId} = auth();
      // console.log(userId);
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(() => {}),
};




