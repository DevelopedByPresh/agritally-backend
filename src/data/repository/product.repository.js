import Product from "../models/product.model.js"

class ProductRepository {
  async save(productDTO) {
    const newProduct = new Product(productDTO);
    const savedProduct = await newProduct.save();
    return savedProduct;
  }

  async findById(productId) {
    const product = await Product.findById(productId)
    .populate({
        path: "user",
        select: ["firstName", "lastName"],
      });
    return product;
  }

  async updateOne(productId, updateDto) {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateDto,
      { new: true }
    );
    return updatedProduct;
  }

  async deleteOne(productId) {
    const deletedProduct = await Product.findByIdAndRemove(productId);
    return deletedProduct;
  }

  async getAll(query) {
    const products = await Product.find(query)
    .populate({
        path: "user",
        select: ["firstName", "lastName"],
      });
    return products;
  }

  async getProductsByCategory(category) {
    const products = await Product.find({ category });
    return products;
  }

  async getProductsBySection(section) {
    const products = await Product.find({ section });
    return products;
  }

}

export default new ProductRepository();
