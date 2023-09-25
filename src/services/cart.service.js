const Cart = require("../models/cart.model");

class CartService {
  async createCart(cartDTO) {
    const newCart = new Cart(cartDTO);

    const savedCart = await newCart.save();
    return savedCart;
  }

//   async getOne(id) {
//     const poultry = await Poultry.findById(id).populate({
//       path: "user",
//       select: ["firstName", "lastName"],
//     });

//     return poultry;
//   }

//   async getAll(filter) {
//     const poultryItems = await Poultry.find(filter).populate({
//       path: "user",
//       select: ["firstName", "lastName"],
//     });

//     return poultryItems;
//   }

//   async updatePoultryItem(itemId, updateDto) {
//     const updatedItem = await Poultry.findByIdAndUpdate(itemId, updateDto, {
//       new: true,
//     });
//     return updatedItem;
//   }

//   async delete(id) {
//     const poultry = await Poultry.findById(id);

//     return poultry;
//   }
}

module.exports = new CartService();
