const OrderRepository = require("../data/repository/order.respository");
const {
  NotFoundException,
} = require("../utils/exceptions/not-found.exception");
const { orderValidator } = require("../validators/order.validation");
const OrderDto = require("../dtos/order/order.Dto");

class OrderService {
  async createOrder(orderDTO) {
    orderValidator.validateOrder(orderDTO);

    const newOrder = await OrderRepository.create(orderDTO);

    const order = OrderDto.from(newOrder);
    return {
      message: "Order created",
      data: newOrder,
    };
  }

  async getOne(id) {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const orderDto = OrderDto.from(order);

    return {
      message: "Order items found",
      data: orderDto,
    };
  }

  async getAll(filter) {
    const { section, year, month, date, category } = filter;

    let query = {};

    if (date && month && year) {
      const startDate = new Date(year, month - 1, date);
      const endDate = new Date(year, month - 1, date + 1);
      query.date = { $gte: startDate, $lt: endDate };
    } else if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (section) {
      query.section = section;
    }

    if (category) {
      query.category = category;
    }
    const productItems = await OrderRepository.getAll(query);

    const productDtos = OrderDto.fromMany(productItems);

    return {
      message: "Product items found",
      count: productDtos.length,
      data: productDtos,
    };
  }

  async updateProductItem(itemId, updateDto) {
    const { id } = itemId;
    const updatedProduct = await OrderRepository.updateOne(id, updateDto);
    if (!updatedProduct) {
      throw new NotFoundException("Product not found");
    }
    const productDto = ProductDto.from(updatedProduct);

    return {
      message: "Product Updated",
      data: productDto,
    };
  }
//create update cart - finish cart
//notifies amdin when a cart is finish
//check if the cart status is completed if yes create another cart else add items to cart
//
  async delete(id) {
    const product = await OrderRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await product.deleteOne();
    return {
      message: "Product items deleted",
    };
  }
}

module.exports = new OrderService();
