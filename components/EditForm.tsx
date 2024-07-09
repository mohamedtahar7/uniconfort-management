"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Spinner from "./ui/Spinner";
import { addOrder, updateOrder } from "@/actions/actions";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Order } from "@prisma/client";
interface EditFormProps {
  order: any;
}
const EditForm = ({ order }: EditFormProps) => {
  const [clientName, setClientName] = useState(order ? order.clientName : "");
  const [clientPhone, setClientPhone] = useState(
    order ? order.clientPhone : ""
  );
  const [clientOrder, setClientOrder] = useState(
    order ? order.clientOrder : ""
  );
  //   const [note, setNote] = useState("");
  //   const [noteArray, setNoteArray] = useState<string[]>([]);
  //   const [orderImg, setOrderImg] = useState<File | null>(null);
  //   const [orderProgress, setOrderProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const id = clientName;
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
    co: string
  ) => {
    setLoading(true);
    const ord = {
      id,
      clientName: cn,
      clientPhone: cp,
      clientOrder: co,
    };
    try {
      const result = await updateOrder(ord, order.id);
      setLoading(false);
      toast.success(
        `The Order of Mr ${ord.clientName} has been edited successfully!`
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
          Modifier une Commande
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(
              id,
              clientName === "" ? order?.clientName : clientName,
              clientPhone === "" ? order?.clientPhone : clientPhone,
              clientOrder === "" ? order?.clientOrder : clientOrder
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
            className="border-[#fffafb]"
            type="text"
            min={0}
            placeholder="Commande de Client"
          />
          {/* <Input
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="border-[#fffafb]"
            type="text"
            min={0}
            placeholder="Remarque"
          /> */}
          {/* <select
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
          </select> */}
          {/* <Input
            className="cursor-pointer"
            type="file"
            placeholder="Image de Commande"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setOrderImg(e.target.files[0]);
              }
            }}
          /> */}
          <Button
            disabled={loading}
            type="submit"
            className="p-2"
            variant={"outline"}
          >
            {loading ? <Spinner d="20" /> : "Sauvegarder les Modifications"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
