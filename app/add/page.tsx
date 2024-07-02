"use client";
import { useState } from "react";
import AddForm from "@/components/AddForm";
import { Button } from "@/components/ui/button";
import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";

const Page = () => {
  const [activeNav, setActiveNav] = useState(false);
  
  return (
    <main className="relative">
      <div className="flex items-center justify-center">
        <AddForm />
      </div>
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
};

export default Page;
