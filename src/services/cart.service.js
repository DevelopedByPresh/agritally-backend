import cartRepository from "../data/repository/cart.repository.js";
import productRepository from "../data/repository/product.repository.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";

class CartService {
  async createCart(newItems) {
    const { productId, cartId, user, quantity } = newItems;

    const foundProduct = await productRepository.findById(productId);

    if (!foundProduct) {
      throw new NotFoundException("Product not found.");
    }

    // Check if a cart already exists for the user
    let cart = await cartRepository.findOne({ user: user, active: true });

    if (!cart) {
      // If no active cart exists, create a new one
      cart = await cartRepository.create({
        user: user,
        cartItems: [],
        active: true,
      });
    } else if (!cart.active) {
      // If cart exists but is not active, create a new one
      cart = await cartRepository.create({
        user: user,
        cartItems: [],
        active: true,
      });
    }
    // TODO: Check when active is false and create a new cart

    const existingItemIndex = cart.cartItems.findIndex((item) =>
      item.productId.equals(foundProduct._id)
    );

    if (existingItemIndex !== -1) {
      // Updating existing item
      const existingItem = cart.cartItems[existingItemIndex];
      existingItem.quantity += quantity;
      existingItem.subtotal += existingItem.quantity * existingItem.price;
    } else {
      // Add new item to cart
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

  async getOne(id) {
    const cart = await cartRepository.findById(id);

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    return {
      message: "Success",
      data: cart,
    };
  }

  // Add get all cart created by a user
  async getAll() {
    const carts = await cartRepository.getAll();

    return {
      message: "Success",
      count: carts.length,
      data: carts,
    };
  }

  async updateCartItem(cartId, updateCartDto) {
    const { productId, quantity } = updateCartDto;

    const cart = await cartRepository.findById(cartId);

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
      message: "Cart Items updated",
      data: cart,
    };
  }

  async removeCartItem(cartId, updateCartDto) {
    const { productId, quantity } = updateCartDto;

    const cart = await cartRepository.findById(cartId);

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

    // Update the quantity and subtotal for the cart item
    cartItem.quantity = quantity;
    cartItem.subtotal = cartItem.price * quantity;

    // Recalculate the cart's total
    cart.total = cart.cartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    await cart.save();
    return {
      message: "Product removed from cart",
      data: cart,
    };
  }

  async delete(id) {
    const deletedCart = await cartRepository.deleteOne(id);

    return {
      message: "Cart deleted",
      data: deletedCart,
    };
  }
}

export default new CartService();
