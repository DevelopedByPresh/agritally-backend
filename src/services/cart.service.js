import { CartRepository, ProductRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";

export class CartService {
  static async createCart(newItems) {
    const { productId, cartId, user, quantity } = newItems;

    const foundProduct = await ProductRepository.findById(productId);

    if (!foundProduct) {
      throw new NotFoundException("Product not found.");
    }

    // Check if a cart already exists for the user
    let cart = await CartRepository.findOne({ user: user, active: true });

    if (!cart) {
      // If no active cart exists, create a new one
      cart = await CartRepository.create({
        user: user,
        cartItems: [],
        active: true,
      });
    } else if (!cart.active) {
      // If cart exists but is not active, create a new one
      cart = await CartRepository.create({
        user: user,
        cartItems: [],
        active: true,
      });
    }

    const existingItemIndex = cart.cartItems.findIndex((item) =>
      item.productId.equals(foundProduct._id)
    );

    if (existingItemIndex !== -1) {
      // Updating existing item
      const existingItem = cart.cartItems[existingItemIndex];
      existingItem.quantity += quantity;
      existingItem.subtotal += existingItem.quantity * existingItem.price;
    } else {
      // Add a new item to the cart
      const newItemData = {
        productId: foundProduct._id,
        name: foundProduct.name,
        price: foundProduct.price,
        quantity,
        subtotal: foundProduct.price * quantity,
      };
      cart.cartItems.push(newItemData);
    }

    // Calculate subtotal
    cart.total = cart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    await cart.save();

    return {
      message: "Item added to cart",
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
