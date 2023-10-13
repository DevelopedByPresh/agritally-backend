import Cart from "../models/cart.model.js";

class CartRepository {
  async create(cartDTO) {
    const newCart = new Cart(cartDTO);
    const savedCart = await newCart.save();
    return savedCart;
  }

  async findById(cartId) {
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

  async findOne(query) {
    const cart = await Cart.findOne(query)
    return cart;
  }

  async updateOne(cartId, updateDto) {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updateDto, {
      new: true,
    });
    return updatedCart;
  }

  async deleteOne(cartId) {
    const deletedCart = await Cart.findByIdAndRemove(cartId);
    return deletedCart;
  }

  async getAll() {
    const carts = await Cart.find();
    return carts;
  }
}

export default new CartRepository();
