import { Product } from "../models/index.js";

export class ProductRepository {
  static async save(productDTO) {
    const newProduct = new Product(productDTO);
    const savedProduct = await newProduct.save();
    return savedProduct;
  }

  static async findById(productId) {
    const product = await Product.findById(productId).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
    return product;
  }

  static async updateOne(productId, updateDto) {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateDto,
      { new: true }
    );
    return updatedProduct;
  }

  static async deleteOne(productId) {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    return deletedProduct;
  }

  static async getAll(query) {
    const products = await Product.find(query).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
    return products;
  }

  static async getProductsByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  static async getProductsBySection(section) {
    const products = await Product.find({ section });
    return products;
  }
}
