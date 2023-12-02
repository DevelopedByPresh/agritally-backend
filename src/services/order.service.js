import { OrderEntity } from "../data/entities/index.js";
import { OrderRepository, CartRepository, ProductRepository} from "../data/repository/index.js";
import { OrderResponseDto } from "../dtos/index.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { queryFilter } from "../utils/index.js";
import { messages } from "../utils/messages.utils.js";

export class OrderService {
  static async createOrder({ cartId, user}) {
    const [ cartOrder, cart ] = await Promise.all([
      OrderRepository.findOne({cartId: cartId}),
      CartRepository.findById(cartId),
    ])

    if (!cartOrder) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Cart order"))
    }
    
    if (!cart) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Cart"))
    }

    for (const { productId, quantity } of cart.cartItems) {
      const product = await ProductRepository.findById(productId);

      if (!product) {
        throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Cart"))
      }

      const updatedQuantity = product.quantity - quantity;

       await ProductRepository.updateOne(productId, {
        quantity: updatedQuantity,
      });
    }

    const orderEntity = OrderEntity.make({cartId, user, total: cart.total});
    const order = await OrderRepository.save(orderEntity);

    return {
      message: messages.COMMON.fn.CREATED("Order"),
      data: OrderResponseDto.from(order),
    };
  }

  static async showAll(filter) {
    const query = queryFilter(filter);
    const orders = await OrderRepository.getAll(query);

    if (orders.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Orders"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Orders"),
      data: OrderResponseDto.fromMany(orders),
    };
  }

  static async getOne(id) {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Order"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Order"),
      data: OrderResponseDto.from(order),
    };
  }

  static async getAllByUser(id) {
    const order = await OrderRepository.getAll({user: id});

    if (!order) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Order"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Order"),
      data: OrderResponseDto.fromMany(order),
    };
  }

  static async update(id, updateOrderDto) {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Order"));
    }

    const updatedOrderEntity = OrderEntity.make({
      ...order._doc,
      ...updateOrderDto,
    });

    const updatedOrder = await OrderRepository.updateOne(
      id,
      updatedOrderEntity
    );

    return {
      message: messages.COMMON.fn.UPDATED("Order"),
      data: OrderResponseDto.from(updatedOrder),
    };
  }

  static async delete(id) {
    await OrderRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Order"),
    };
  }
}
