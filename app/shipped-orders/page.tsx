"use client";
import React, { useContext, useEffect, useState } from "react";
import { getOrders, getOrdersByName } from "@/actions/actions";
import OrderCard from "@/components/OrderCard";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { AiOutlineMenuFold } from "react-icons/ai";
import MobileNav from "@/components/MobileNav";
import { QueryContext } from "@/contexts/QueryContext";
import SearchBar from "@/components/SearchBar";
import { categories } from "@/lib/categories";
const Page = () => {
  const { query } = useContext(QueryContext);
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState(false);
  const fetchOrders = async () => {
    const ords: any = await getOrders();
    setOrders(ords);
  };
  const fetchOrdersByName = async (query: any) => {
    const ords: any = await getOrdersByName(query);
    setOrders(ords);
  };
  useEffect(() => {
    if (query === "") {
      fetchOrders();
      setLoading(false);
    } else {
      fetchOrdersByName(query);
      setLoading(false);
    }
  }, [orders]);
  return (
    <main>
      <h2 className="text-center mb-5 text-3xl text-slate-800 font-semibold">
        Commandes Pretes
      </h2>
      <SearchBar />
      <div className="flex md:flex-row flex-col items-center gap-4 justify-center px-6 pb-6">
        <h2>Filter : </h2>
        {categories.map((cat: any, id: any) => (
          <h2
            className={`${
              cat === category
                ? "text-white bg-slate-800"
                : "border border-slate-800"
            } py-1 px-3 transition duration-150 hover:bg-slate-800 hover:text-white cursor-pointer`}
            key={id}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </h2>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        {loading ? (
          <Spinner d="10" />
        ) : category === "" ? (
          orders
            .filter((order: any) => order.orderState === "S")
            .map((order, id) => <OrderCard order={order} key={id} />)
        ) : (
          orders
            .filter((order: any) => order.orderState === "S")
            .filter((order: any) => order.category === category)
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
