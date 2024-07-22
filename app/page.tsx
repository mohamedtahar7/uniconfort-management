"use client";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

export default function Home() {
  const [activeNav, setActiveNav] = useState(false);
  return (
    <main className="py-5 flex items-center justify-center">
      <h1 className="text-slate-800 text-lg sm:text-3xl text-center font-semibold">
        Bienvenue sur Uniconfort Dashboard
      </h1>
      <Button
        onClick={() => setActiveNav(!activeNav)}
        variant={"outline"}
        className="md:hidden flex items-center justify-center absolute top-2 right-2"
      >
        <AiOutlineMenuFold size={30} className="text-slate-800" />
      </Button>
      <MobileNav activeNav={activeNav} />
    </main>
  );
}
