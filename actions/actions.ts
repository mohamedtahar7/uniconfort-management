"use server";
import { db } from "@/lib/db";
import { Order } from "@prisma/client";
export async function addOrder(order: Order) {
  // omit user id means the type is user but without the id
  const result = await db.order.create({
    data: {
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      clientOrder: order.clientOrder,
      orderImg: order.orderImg,
      orderState: order.orderState,
      orderProgress: order.orderProgress,
    },
  });
}
export async function getOrders() {
  try {
    const orders = await db.order.findMany();
    return orders;
  } catch (error) {
    console.log(error);
  }
}
