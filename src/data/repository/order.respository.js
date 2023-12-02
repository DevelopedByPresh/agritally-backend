import { Order } from "../models/index.js";
export class OrderRepository {
  static async save(orderDTO) {
    const newOrder = new Order(orderDTO);
    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  static async findById(orderId) {
    const order = await Order.findById(orderId).populate({
      path: "cartId",
      select: ["cartItems", "total"],
    });
    return order;
  }

  static async findOne(query) {
    const order = await Order.findOne(query).populate({
      path: "cartId",
      select: ["cartItems", "total"],
    });
    return order;
  }

  static async updateOne(orderId, updateDto) {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateDto, {
      new: true,
    });
    return updatedOrder;
  }

  static async deleteOne(orderId) {
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    return deletedOrder;
  }

  static async getAll(query) {
    const orders = await Order.find(query)
      .populate({
        path: "cartId",
        select: ["cartItems"],
      })
      .populate({
        path: "cartId.cartItems.productId",
        select: ["category", "section"],
      });
    return orders;
  }
}
