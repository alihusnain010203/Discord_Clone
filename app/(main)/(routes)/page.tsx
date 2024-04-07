
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle-ui";
export default function Home() {

  return (
    <>
    <h1>Heloo Next Js</h1>
    <UserButton afterSignOutUrl="/"/>
   <ModeToggle/>
    </>
  );
}
