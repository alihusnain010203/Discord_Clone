import React from "react";
import { initialProfile } from "@/lib/intial-profile";
import { redirect } from "next/navigation"
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";
const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });
  if (server) {

    console.log("Server already exists");

    return redirect(`/server/${server.id}`)
  }
  return <InitialModal />;
};

export default SetupPage;
