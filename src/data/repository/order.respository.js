const Order = require("../models/order.model");

class OrderRepository {
  async create(orderDTO) {
    const newOrder = new Order(orderDTO);
    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  async findById(orderId) {
    const order = await Order.findById(orderId)
      .populate("user", ["firstName", "lastName"])
      .populate("cartId");
    return order;
  }

  async findOne(query) {
    const order = await Order.findOne(query)
      .populate("user", ["firstName", "lastName"])
      .populate("cartId");
    return order;
  }

  async updateOne(orderId, updateDto) {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateDto,
      { new: true }
    );
    return updatedOrder;
  }

  async deleteOne(orderId) {
    const deletedOrder = await Order.findByIdAndRemove(orderId);
    return deletedOrder;
  }

  async getAll(query) {
    const orders = await Order.find(query)
      .populate("user", ["firstName", "lastName"])
      .populate("cartId");
    return orders;
  }
}

module.exports = new OrderRepository();
