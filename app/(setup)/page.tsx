import React from "react";
import { initialProfile } from "@/lib/intial-profile";
import {redirect} from "next/navigation"
import { db } from "@/lib/db";
const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });
  if(server){
 
    return redirect(`/server/${server.id}`)
  }
  return <div>Create a server</div>;
};

export default SetupPage;
