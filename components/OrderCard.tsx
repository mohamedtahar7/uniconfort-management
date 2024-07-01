import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
interface OrderCardProps {
  order: any;
}
const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card className="relative bg-zinc-200 rounded-xl w-full">
      <CardContent className="flex md:flex-row flex-col items-start justify-between gap-3 py-2">
        <div className="flex flex-col gap-2">
          <h2>Nom de Client: {order.clientName}</h2>
          <h2>Numero de Client: {order.clientPhone}</h2>
          <h2 className="">
            Commande de Client: <br /> {order.clientOrder}
          </h2>
        </div>
        <div>
          <img
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
        <Button>Finish</Button>
        <Button>Next</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
