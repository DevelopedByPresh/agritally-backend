const Product = require("../models/product.model");
const User = require("../models/user.model");

class ProductService {
  async createProduct(productDTO) {
    const newProduct = new Product(productDTO);

    const savedProduct = await newProduct.save();
    return savedProduct;
  }

  async getOne(id) {
    const product = await Product.findById(id).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return product;
  }

  async getAll(filter) {
    const productItems = await Product.find(filter).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return productItems;
  }

  async updateProductItem(itemId, updateDto) {
    const updatedItem = await Product.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const product = await Product.findById(id);

    return product;
  }
}

module.exports = new ProductService();
