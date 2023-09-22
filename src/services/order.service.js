
const Order = require("../models/Order.model");

class OrderService {
  async addOrderItem(orderDTO) {
    const newOrder = new Order(orderDTO);

    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  async getOne(id) {
    const Order = await Order.findById(id).populate({
      path: "order",
      select: ["firstName", "lastName"],
    });

    return Order;
  }

  async getAll(filter) {
    const OrderItems = await Order.find(filter).populate({
      path: "order",
      select: ["firstName", "lastName"],
    });

    return OrderItems;
  }

  async updateOrderItem(itemId, updateDto) {
    const updatedItem = await Order.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const Order = await Order.findById(id);

    return Order;
  }
}

module.exports = new OrderService();
