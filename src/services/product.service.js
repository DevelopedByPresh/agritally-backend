import ProductRepository from "../data/repository/product.repository.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import { productValidator } from "../validators/product.validation.js";
import ProductDto from "../dtos/product/product.Dto.js";

class ProductService {
  async createProduct(productDTO) {
    productValidator.validateProduct(productDTO);

    const newProduct = await ProductRepository.save(productDTO);

    const product = ProductDto.from(newProduct);
    return {
      message: "Product created",
      data: product,
    };
  }

  async getOne(id) {
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const productDto = ProductDto.from(product);

    return {
      message: "Product items found",
      data: productDto,
    };
  }

  async getAll(filter) {
    const { section, year, month, date, category } = filter;

    let query = {};

    if (date && month && year) {
      const startDate = new Date(year, month - 1, date);
      const endDate = new Date(year, month - 1, date + 1);
      query.date = { $gte: startDate, $lt: endDate };
    } else if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (section) {
      query.section = section;
    }

    if (category) {
      query.category = category;
    }
    const productItems = await ProductRepository.getAll(query);

    const productDtos = ProductDto.fromMany(productItems);

    return {
      message: "Product items found",
      count: productDtos.length,
      data: productDtos,
    };
  }

  async updateProductItem(itemId, updateDto) {
    const { id } = itemId;
    const updatedProduct = await ProductRepository.updateOne(id, updateDto);
    if (!updatedProduct) {
      throw new NotFoundException("Product not found");
    }
    const productDto = ProductDto.from(updatedProduct);

    return {
      message: "Product Updated",
      data: productDto,
    };
  }

  async delete(id) {
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await product.deleteOne();
    return {
      message: "Product items deleted",
    };
  }
}

export default new ProductService();
