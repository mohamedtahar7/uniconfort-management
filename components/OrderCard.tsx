import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  deleteNote,
  deleteOrder,
  updateOrderProgress,
  updateOrderState,
} from "@/actions/actions";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { password } from "@/lib/password";
import Slider from "./Slider";
interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();
  const updateProgress = () => {
    if (order?.orderProgress === "Menuisier") {
      updateOrderProgress("Tapicier", order?.id);
      toast.success("Menuisier Finished");
    }
    if (order?.orderProgress === "Tapicier") {
      updateOrderProgress("Commercial", order?.id);
      toast.success("Tapicier Finished");
    }
    if (order?.orderProgress === "Commercial") {
      updateOrderState(order?.id, "F");
      toast.success("Order is ready to be shipped");
    }
  };
  return (
    <Card className="overflow-x-hidden relative bg-zinc-200 rounded-xl w-full">
      <Toaster />
      <CardContent className="flex md:flex-row flex-col items-start justify-between gap-3 py-2">
        <div className="flex flex-col gap-2">
          <h2>Nom de Client: {order?.clientName}</h2>
          <h2>Numero de Client: {order?.clientPhone}</h2>
          {order?.orderState === "P" ? (
            <h2>
              Date Ajoutée: {order?.addedDate.getDate()}/
              {order?.addedDate.getMonth() + 1}/{order?.addedDate.getFullYear()}
            </h2>
          ) : (
            <div className="flex flex-col gap-1">
              <h2>
                Date Ajoutée: {order?.addedDate.getDate()}/
                {order?.addedDate.getMonth() + 1}/
                {order?.addedDate.getFullYear()}
              </h2>
              <h2>
                Date Termineé: {order?.finishedDate.getDate()}/
                {order?.finishedDate.getMonth() + 1}/
                {order?.finishedDate.getFullYear()}
              </h2>
            </div>
          )}
          <h2 className="">
            Commande de Client: <br /> {order?.clientOrder}
          </h2>
          {order?.orderState === "P" && (
            <div className="flex items-center gap-1">
              <h4 className="">Progress : {order?.orderProgress}</h4>
            </div>
          )}
          {order?.note && (
            <div className="flex flex-col gap-2">
              {order?.orderState === "P" && (
                <div className="flex flex-col gap-3 items-start justify-between">
                  <h1>Remarques:</h1>
                  <div className="flex flex-col gap-3">
                    {order?.note.map((n: string, index: any) => {
                      if (n !== "") {
                        return (
                          <h4
                            key={index}
                            className={`flex items-center justify-between w-full rounded-lg text-white p-2 mr-2 bg-red-500`}
                          >
                            {order?.note[index]}
                            <Button
                              className=" text-red-500"
                              onClick={() => {
                                deleteNote(order.id, order?.note[index]);
                                toast.success("remarque supprimée");
                              }}
                              variant={"secondary"}
                            >
                              <AiFillDelete size={20} />
                            </Button>
                          </h4>
                        );
                      }
                    })}
                  </div>
                  {/* <Link href="/">
                  <Button className="flex items-center transition w-full rounded-xl text-lg text-[#fffafb]">
                    Ajouter un remarque
                  </Button>
                </Link> */}
                </div>
              )}
            </div>
          )}
          {/* <div className="flex items-center gap-1">
              <Button
                onClick={() => {
                  updateOrderState(order?.id);
                  toast.success("Order is ready to be shipped");
                  router.refresh();
                }}
              >
                Finish
              </Button>
              <Button
                onClick={() => {
                  updateProgress();
                  router.refresh();
                }}
              >
                Next
              </Button>
            </div> */}
        </div>
        {order?.orderImg.length === 1 ? (
          <div className="flex mb-6 items-center w-[360px] h-[360px] overflow-hidden">
            <Image
              width={480}
              height={480}
              src={order?.orderImg[0]}
              alt="receipt img"
            />
          </div>
        ) : (
          <Slider images={order?.orderImg} />
        )}
      </CardContent>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Link href={`/edit/${order.id}`}>
          <Button
            onClick={() => {
              // toast.success("Ajouté au Panier");
            }}
            variant={"outline"}
            className="flex items-center gap-2 w-full transition rounded-xl text-lg text-slate-900 "
          >
            <CiEdit size={20} />
          </Button>
        </Link>
        <Button
          variant={"destructive"}
          className="flex items-center transition w-full rounded-xl text-lg text-[#fffafb]"
          onClick={() => {
            const pass = prompt("Enter the password");
            if (pass === password) {
              deleteOrder(order?.id);
              toast.success("Order Removed!");
            } else {
              toast.error("Wrong password");
            }
            router.refresh();
          }}
        >
          <AiFillDelete size={20} />
        </Button>
      </div>
      {order?.orderState === "P" && (
        <div className="w-full p-4 absolute flex sm:flex-row flex-col gap-2 bottom-2 sm:left-0  left-2">
          <div className="flex items-center gap-1">
            <Button
              onClick={() => {
                const pass = prompt("Enter the password");
                if (pass === password) {
                  updateOrderState(order?.id, "F");
                  toast.success("Order is ready to be shipped");
                } else {
                  toast.error("Wrong password");
                }
                router.refresh();
              }}
            >
              Terminé
            </Button>
            <Button
              onClick={() => {
                const pass = prompt("Enter the password");
                if (pass === password) {
                  updateProgress();
                  router.refresh();
                } else {
                  toast.error("Wrong password");
                }
              }}
            >
              Suivant
            </Button>
          </div>
          <Link href={`/add-note/${order?.id}`}>
            <Button>Ajouter une remarque</Button>
          </Link>
        </div>
      )}
      {order?.orderState === "F" && (
        <div className="w-full p-4 absolute flex sm:flex-row flex-col gap-2 bottom-2 sm:left-0  left-2">
          <div className="flex items-center gap-1">
            <Button
              onClick={() => {
                const pass = prompt("Enter the password");
                if (pass === password) {
                  updateOrderState(order?.id, "S");
                  toast.success("Commande Livrée");
                } else {
                  toast.error("Wrong password");
                }
                router.refresh();
              }}
            >
              Livrer
            </Button>
            <Button
              onClick={() => {
                const pass = prompt("Enter the password");
                if (pass === password) {
                  updateOrderState(order?.id, "P");
                  toast.success("Commande en cours");
                } else {
                  toast.error("Wrong password");
                }
              }}
            >
              Retourner vers Commandes en cours
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default OrderCard;
