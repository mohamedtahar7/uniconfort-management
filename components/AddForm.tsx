"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Spinner from "./ui/Spinner";
import { addOrder } from "@/actions/actions";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { password } from "@/lib/password";
import { Textarea } from "./ui/textarea";
import { categories } from "@/lib/categories";
const AddForm = () => {
  const router = useRouter();
  const [imageNum, setImageNum] = useState([{}]);
  const [clientName, setClientName] = useState("");
  const [category, setCategory] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientOrder, setClientOrder] = useState("");
  const [note, setNote] = useState("");
  const [noteArray, setNoteArray] = useState<string[]>([]);
  const [orderImg, setOrderImg] = useState<File | null>(null);
  const [orderProgress, setOrderProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>([]);
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
    ci: File[],
    n: string,
    op: string,
    os: string,
    cat: string
  ) => {
    let imagesLinks = [];
    let orderImgLink = "";
    for (let i = 0; i < ci.length; i++) {
      if (ci[i] !== null) {
        orderImgLink = await uploadImg(ci[i]);
        imagesLinks.push(orderImgLink);
      }
      orderImgLink = "";
    }
    let finalImages = imagesLinks.filter((img) => img !== undefined);
    console.log(imagesLinks);
    const noteTable = [...noteArray, n];
    const today = new Date();
    const order = {
      id,
      clientName: cn,
      clientPhone: cp,
      clientOrder: co,
      orderImg: finalImages,
      note: noteTable,
      orderProgress: op,
      orderState: os,
      addedDate: today,
      finishedDate: today,
      category: cat,
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
  console.log(images);

  return (
    <div className="sm:w-[50%] w-full">
      <Toaster richColors />
      <div className="flex flex-col gap-4 py-2 px-5 bg-slate-700 rounded-xl">
        <h2 className="text-[#fffafb] text-center text-xl font-semibold">
          Ajouter une Commande
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const pass = prompt("Enter the password");
            if (pass === password) {
              handleSubmit(
                id,
                clientName,
                clientPhone,
                clientOrder,
                images,
                note,
                orderProgress,
                orderState,
                category
              );
            } else {
              toast.error("Wrong password");
            }
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
          <Textarea
            value={clientOrder}
            onChange={(e) => {
              setClientOrder(e.target.value);
            }}
            required
            className="border-[#fffafb]"
            placeholder="Commande de Client"
          />
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
          <select
            className="rounded-md p-3"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
          >
            <option>Choose a Category</option>
            {categories.map((cat, id) => (
              <option key={id} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-2">
            {imageNum.map((img, id) => (
              <Input
                key={id}
                className="cursor-pointer"
                type="file"
                placeholder="Image de Commande"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImages([...images, e.target.files[0]]);
                  }
                }}
              />
            ))}
            <p
              onClick={() => setImageNum([...imageNum, {}])}
              className="w-full py-2 bg-[#fafbfb] text-center rounded-lg transition hover:opacity-80 cursor-pointer font-medium text-sm"
            >
              Ajouter une Image
            </p>
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="p-2"
            variant={"outline"}
          >
            {loading ? <Spinner d="20" /> : "Ajouter la Commande"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
