"use client";
import { useEffect, useState } from "react";
import AddForm from "@/components/AddForm";
import { Button } from "@/components/ui/button";
import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import EditForm from "@/components/EditForm";
import { Order } from "@prisma/client";
import { useParams } from "next/navigation";
import { getOrderById } from "@/actions/actions";

const Page = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { orderId } = useParams();
  const fetchOrder = async () => {
    const ord: any = await getOrderById(orderId);
    setOrder(ord);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <main className="relative">
      <div className="flex items-center justify-center">
        <EditForm order={order} />
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
