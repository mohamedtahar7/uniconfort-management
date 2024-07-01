"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "@/actions/actions";
import OrderCard from "@/components/OrderCard";
const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        Commandes en Cours
      </h2>
      <div className="flex flex-col gap-5">
        {orders
          .filter((order: any) => order.orderState === "P")
          .map((order, id) => (
            <OrderCard order={order} key={id} />
          ))}
      </div>
    </main>
  );
};

export default Page;
