"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Spinner from "./ui/Spinner";
import { addOrder } from "@/actions/actions";
import { Toaster, toast } from "sonner";
const AddForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientOrder, setClientOrder] = useState("");
  const [orderImg, setOrderImg] = useState("");
  const [orderProgress, setOrderProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const id = clientName;
  const orderState = "P";
  const handleSubmit = async (
    id: string,
    cn: string,
    cp: string,
    co: string,
    ci: string,
    op: string,
    os: string
  ) => {
    setLoading(true);
    const order = {
      id,
      clientName: cn,
      clientPhone: cp,
      clientOrder: co,
      orderImg: ci,
      orderProgress: op,
      orderState: os,
    };
    try {
      const result = await addOrder(order);
      setLoading(false);
      toast.success(
        `The Order of Mr ${order.clientName} has been added successfully!`
      );
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="sm:w-[50%] w-full">
      <Toaster richColors />
      <div className="flex flex-col gap-4 py-2 px-5 bg-slate-700 rounded-xl">
        <h2 className="text-[#fffafb] text-center text-xl font-semibold">
          Ajouter un Produit
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              id,
              clientName,
              clientPhone,
              clientOrder,
              orderImg,
              orderProgress,
              orderState
            );
          }}
          className="flex flex-col gap-3"
        >
          <Input
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            placeholder="Nom de Client"
            required
          />
          <Input
            value={clientPhone}
            onChange={(e) => {
              setClientPhone(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            placeholder="Numero de Client"
          />
          <Input
            value={clientOrder}
            onChange={(e) => {
              setClientOrder(e.target.value);
            }}
            required
            className="border-[#fffafb]"
            type="text"
            min={0}
            placeholder="Commande de Client"
          />
          <select
            className="rounded-md p-3"
            onChange={(e) => {
              setOrderProgress(e.target.value);
            }}
            required
          >
            <option>Choose a Level</option>
            <option value="Menuisier">Menuisier</option>
            <option value="Tapicier">Tapicier</option>
            <option value="Commercial">Commercial</option>
          </select>
          <Input
            className="cursor-pointer"
            type="text"
            placeholder="Image 1"
            value={orderImg}
            onChange={(e) => setOrderImg(e.target.value)}
          />
          <Button
            disabled={loading}
            type="submit"
            className="p-2"
            variant={"outline"}
          >
            {loading ? <Spinner d="20" /> : "Ajouter le Produit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
