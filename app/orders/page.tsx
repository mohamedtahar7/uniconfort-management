"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "@/actions/actions";
import OrderCard from "@/components/OrderCard";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { AiOutlineMenuFold } from "react-icons/ai";
import MobileNav from "@/components/MobileNav";
const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState(false);
  const fetchOrders = async () => {
    const ords: any = await getOrders();
    setOrders(ords);
  };
  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, []);
  return (
    <main>
      <h2 className="text-center mb-5 text-3xl text-slate-800 font-semibold">
        Commandes Pretes
      </h2>
      <div className="flex flex-col gap-5">
        {loading && orders.length === 0 ? (
          <Spinner d="10" />
        ) : (
          orders
            .filter((order: any) => order.orderState === "F")
            .map((order, id) => <OrderCard order={order} key={id} />)
        )}
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
