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
      note: order.note,
      orderState: order.orderState,
      orderProgress: order.orderProgress,
      addedDate: order.addedDate,
      finishedDate: order.finishedDate,
      category: order.category,
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
export async function getOrderById(id: any) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: id,
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}
export async function getOrdersByName(query: any) {
  try {
    const order = await db.order.findMany({
      where: {
        clientName: {
          contains: query,
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrder(newVal: any, id: any) {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: id,
      },
      data: {
        clientName: newVal.clientName,
        clientPhone: newVal.clientPhone,
        clientOrder: newVal.clientOrder,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrderProgress(newVal: string, id: any) {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: id,
      },
      data: {
        orderProgress: newVal,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrderNotes(newVal: any, id: any) {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: id,
      },
      data: {
        note: newVal,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrderState(id: any, newState: string) {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: id,
      },
      data: {
        orderState: newState,
        finishedDate: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteOrder(id: any) {
  try {
    const deletedProduct = await db.order.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteNote(id: any, note: any) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: id,
      },
    });
    if (order) {
      const noteArray = order.note.filter((n) => n !== note);
      const updatedOrder = await db.order.update({
        where: {
          id: id,
        },
        data: {
          note: noteArray,
        },
      });
    }
  } catch (error) {}
}
