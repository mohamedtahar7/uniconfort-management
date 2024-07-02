import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrderProgress, updateOrderState } from "@/actions/actions";
interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();
  const updateProgress = () => {
    if (order.orderProgress === "Menuisier") {
      updateOrderProgress("Tapicier", order.id);
      toast.success("Menuisier Finished");
    }
    if (order.orderProgress === "Tapicier") {
      updateOrderProgress("Commercial", order.id);
      toast.success("Tapicier Finished");
    }
    if (order.orderProgress === "Commercial") {
      updateOrderState(order.id);
      toast.success("Order is ready to be shipped");
    }
  };
  return (
    <Card className="overflow-x-hidden relative bg-zinc-200 rounded-xl w-full">
      <Toaster />
      <CardContent className="flex md:flex-row flex-col items-start justify-between gap-3 py-2">
        <div className="flex flex-col gap-2">
          <h2>Nom de Client: {order.clientName}</h2>
          <h2>Numero de Client: {order.clientPhone}</h2>
          <h2 className="">
            Commande de Client: <br /> {order.clientOrder}
          </h2>
        </div>
        <div className="flex items-center w-[360px] h-[360px] overflow-hidden">
          <Image
            width={480}
            height={480}
            src={order.orderImg}
            alt="receipt img"
          />
        </div>
      </CardContent>
      {order.orderState === "P" && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <div className="w-4 h-4 bg-green-600 rounded-full" />
          <h4 className="">Progress : {order.orderProgress}</h4>
        </div>
      )}
      {order.orderState === "P" && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <Button
            onClick={() => {
              updateOrderState(order.id);
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
        </div>
      )}
    </Card>
  );
};

export default OrderCard;
