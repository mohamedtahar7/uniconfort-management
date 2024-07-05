"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Spinner from "./ui/Spinner";
import { addOrder } from "@/actions/actions";
import { Toaster, toast } from "sonner";
import axios from "axios";
interface EditFormProps {
  order: any;
}
const EditForm = ({ order }: EditFormProps) => {
  const [clientName, setClientName] = useState(order.clientName);
  const [clientPhone, setClientPhone] = useState(order.clientPhone);
  const [clientOrder, setClientOrder] = useState(order.clientOrder);
  const [note, setNote] = useState(order.note);
  const [orderImg, setOrderImg] = useState<File | null>(null);
  const [orderProgress, setOrderProgress] = useState(order.orderProgress);
  const [loading, setLoading] = useState(false);
  const id = clientName;
  const orderState = "P";
  const uploadImg = async (img: any) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "uniconfort_preset");
    try {
      let api = `https://api.cloudinary.com/v1_1/dlzmmzpkw/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      alert(error);
    }
  };
  const handleSubmit = async (
    id: string,
    cn: string,
    cp: string,
    co: string,
    ci: any,
    n: string,
    op: string,
    os: string
  ) => {
    setLoading(true);
    let orderImgLink = "";
    if (ci !== null) {
      orderImgLink = await uploadImg(ci);
    }
    const order = {
      id,
      clientName: cn,
      clientPhone: cp,
      clientOrder: co,
      orderImg: orderImgLink,
      note: n,
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
              note,
              orderProgress,
              orderState
            );
          }}
          className="flex flex-col gap-3"
        >
          <label className="text-white">Nom de Client</label>
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
          <label className="text-white">Numero de Client</label>
          <Input
            value={clientPhone}
            onChange={(e) => {
              setClientPhone(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            placeholder="Numero de Client"
          />
          <label className="text-white">Commande de Client</label>
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
          <label className="text-white">Remarque</label>
          <Input
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            min={0}
            placeholder="Remarque"
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
          <label className="text-white">Image</label>
          <Input
            className="cursor-pointer"
            type="file"
            placeholder="Image de Commande"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setOrderImg(e.target.files[0]);
              }
            }}
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

export default EditForm;
