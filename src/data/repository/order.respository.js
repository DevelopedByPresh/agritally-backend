import Order from"../models/order.model.js"

class OrderRepository {
  async create(orderDTO) {
    const newOrder = new Order(orderDTO);
    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  async findById(orderId) {
    const order = await Order.findById(orderId)
    .populate({
      path: "cartId",
      select: ["cartItems", "total"],
    })
    return order;
  }


  //autopupolate

  async findOne(query) {
    const order = await Order.findOne(query)
    .populate({
      path: "cartId",
      select: ["cartItems", "total"],
    })
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

export default new OrderRepository();
