import ProductRepository from '../data/repository/product.repository.js';
import OrderRepository from '../data/repository/order.respository.js';
import { NotFoundException } from '../utils/exceptions/not-found.exception.js';
import { orderValidator } from '../validators/order.validation.js';
import ProductDto from '../dtos/product/product.Dto.js';
import OrderDto from '../dtos/order/order.Dto.js';
import cartRepository from '../data/repository/cart.repository.js';

class OrderService {
  async createOrder(orderDTO) {
    orderValidator.validateOrder(orderDTO);

    // Fetch the cart from the database
    const { cartId, total } = orderDTO;
    const cart = await cartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Calculate the updated quantity for each product and update them
    for (const { productId, quantity } of cart.cartItems) {
      const product = await ProductRepository.findById(productId);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Calculate the updated quantity
      const updatedQuantity = product.quantity - quantity;

      // Update the quantity in the database
      await ProductRepository.updateOne(productId, {
        quantity: updatedQuantity,
      });
    }

    // Create the order
    const newOrder = await OrderRepository.create({ cartId, total: cart.total });

    const order = OrderDto.from(newOrder);
    return {
      message: 'Order created',
      data: newOrder,
    };
  }

  async getOne(id) {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderDto = OrderDto.from(order);

    return {
      message: 'Order items found',
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
      message: 'Product items found',
      count: productDtos.length,
      data: productDtos,
    };
  }

  async updateProductItem(itemId, updateDto) {
    const { id } = itemId;
    const updatedProduct = await OrderRepository.updateOne(id, updateDto);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    const productDto = ProductDto.from(updatedProduct);

    return {
      message: 'Product Updated',
      data: productDto,
    };
  }

  async delete(id) {
    const product = await OrderRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.deleteOne();
    return {
      message: 'Product items deleted',
    };
  }
}

export default new OrderService();
