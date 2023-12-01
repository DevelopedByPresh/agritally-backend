import { CartEntity } from "../data/entities/index.js";
import { CartRepository, ProductRepository } from "../data/repository/index.js";
import { CartResponseDto } from "../dtos/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";

export class CartService {
  static async createCart(newItems) {
    const { cartItems, user } = newItems;
    const { productId, quantity } = cartItems[0];

    const foundProduct = await ProductRepository.findById(productId);

    if (!foundProduct) {
      throw new NotFoundException("Product not found.");
    }

    let cart = await CartRepository.findOne({ user: user, active: true });
    if (!cart || !cart.active) {
      const cartEntity = CartEntity.make({ user, newItems });

      cart = await CartRepository.create(cartEntity);
    }

    const existingItemIndex = cart.cartItems.findIndex((item) =>
      item.productId[0]._id.equals(foundProduct._id)
    );

    if (existingItemIndex !== -1) {
      const existingItem = cart.cartItems[existingItemIndex];
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      const newData = {
        productId: foundProduct._id,
        price: foundProduct.price,
        quantity,
        subtotal: foundProduct.price * quantity,
      };
      cart.cartItems.push(newData);
    }

    cart.total = cart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    await cart.save();

    return {
      message: "Item(s) added to cart",
      data: cart,
    };
  }

  static async getAll() {
    const carts = await CartRepository.getAll();

    return {
      message: "Success",
      count: carts.length,
      data: carts,
    };
  }

  static async getOne(id) {
    const cart = await CartRepository.findById(id);

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return {
      message: "Success",
      data: cart,
    };
  }

  static async getUserCart(userId, filter) {
    const cart = await CartRepository.findOne({user:userId, active: filter});

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return {
      message: "Success",
      data: cart,
    };
  }

  static async updateCartItem(cartId, updateCartDto) {
    const { productId, quantity } = updateCartDto;

    const cart = await CartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    const cartItem = cart.cartItems.find((item) =>
      item.productId.equals(productId)
    );

    if (!cartItem) {
      throw new NotFoundException("Product not found in the cart");
    }

    cartItem.quantity = quantity;
    cartItem.subtotal = cartItem.price * quantity;

    cart.total = cart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();
    return {
      message: "Cart items updated",
      data: cart,
    };
  }

  static async removeCartItem(cartDto) {
    const { cartId, productId } = cartDto;

    const cart = await CartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    // Find the cart item corresponding to the given productId
    const cartItem = cart.cartItems.find((item) =>
      item.productId.equals(productId)
    );

    if (!cartItem) {
      throw new NotFoundException("Product not found in the cart");
    }

    await cartItem.deleteOne();

    // Recalculate the cart's total
    cart.total = cart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();
    return {
      message: "Product removed from the cart",
      data: cart,
    };
  }

  static async delete(id) {
    const deletedCart = await CartRepository.deleteOne(id);

    return {
      message: "Cart deleted",
      data: deletedCart,
    };
  }
}
