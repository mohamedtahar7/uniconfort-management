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
      router.refresh();
    }
    if (order.orderProgress === "Tapicier") {
      updateOrderProgress("Commercial", order.id);
      toast.success("Tapicier Finished");
      router.refresh();
    }
    if (order.orderProgress === "Commercial") {
      updateOrderState(order.id);
      toast.success("Order is ready to be shipped");
      router.refresh();
    }
  };
  return (
    <Card className="relative bg-zinc-200 rounded-xl w-full">
      <Toaster />
      <CardContent className="flex md:flex-row flex-col items-start justify-between gap-3 py-2">
        <div className="flex flex-col gap-2">
          <h2>Nom de Client: {order.clientName}</h2>
          <h2>Numero de Client: {order.clientPhone}</h2>
          <h2 className="">
            Commande de Client: <br /> {order.clientOrder}
          </h2>
        </div>
        <div>
          <Image
            width={480}
            height={480}
            src="https://images.template.net/wp-content/uploads/2017/05/Money-Order-Receipt.jpg"
            alt="receipt img"
          />
        </div>
      </CardContent>
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-4 h-4 bg-green-600 rounded-full" />
        <h4 className="">Progress : {order.orderProgress}</h4>
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <Button
          onClick={() => {
            updateOrderState(order.id);
            toast.success("Order is ready to be shipped");
          }}
        >
          Finish
        </Button>
        <Button
          onClick={() => {
            updateProgress();
          }}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
