"use client";
import { getOrderById, updateOrderNotes } from "@/actions/actions";
import MobileNav from "@/components/MobileNav";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Toaster, toast } from "sonner";
const Page = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { orderId } = useParams();
  const fetchOrder = async () => {
    const ord: any = await getOrderById(orderId);
    setOrder(ord);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleSubmit = async (order: any, newNote: string) => {
    try {
      setLoading(true);
      const newNoteArray = [...order.note, newNote];
      updateOrderNotes(newNoteArray, order.id);
      setLoading(false);
      toast.success("Remarque ajoutée");
    } catch (error) {
      toast.error("Error!");
    }
  };
  console.log(order?.clientName);
  return (
    <main>
      <div className="p-10 text-center">
        <Toaster />
        <h1 className="text-2xl md:text-4xl text-slate-800 mb-10 font-semibold">
          Ajouter votre remarque
        </h1>
        <div className="flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(order, newNote);
            }}
            className="w-full md:w-[50%] flex flex-col gap-4 bg-slate-800 rounded-xl p-4"
          >
            <Input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              type="text"
              placeholder="Remarque"
            />
            <Button variant={"outline"}>
              {loading ? <Spinner d="6" /> : "Ajouter la Remarque"}
            </Button>
          </form>
        </div>
        <Button
          onClick={() => setActiveNav(!activeNav)}
          variant={"outline"}
          className="md:hidden flex items-center justify-center absolute top-2 right-2"
        >
          <AiOutlineMenuFold size={30} className="text-slate-800" />
        </Button>
        <MobileNav activeNav={activeNav} />
      </div>
    </main>
  );
};

export default Page;
