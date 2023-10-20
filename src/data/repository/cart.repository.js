import Cart from "../models/cart.model.js";

export class CartRepository {
  static async create(cartDTO) {
    const newCart = new Cart(cartDTO);
    const savedCart = await newCart.save();
    return savedCart;
  }

  static async findById(cartId) {
    const cart = await Cart.findById(cartId)
      .populate({
        path: "user",
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "cartItems.productId",
        select: ["category", "section"],
      });
    return cart;
  }

  static async findOne(query) {
    const cart = await Cart.findOne(query);
    return cart;
  }

  static async updateOne(cartId, updateDto) {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updateDto, {
      new: true,
    });
    return updatedCart;
  }

  static async deleteOne(cartId) {
    const deletedCart = await Cart.findByIdAndRemove(cartId);
    return deletedCart;
  }

  static async getAll() {
    const carts = await Cart.find();
    return carts;
  }
}
