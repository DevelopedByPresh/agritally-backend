import { ProductEntity } from "../data/entities/index.js";
import { ProductRepository } from "../data/repository/index.js";
import { ProductResponseDto } from "../dtos/product/index.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { queryFilter } from "../utils/index.js";
import { messages } from "../utils/messages.utils.js";

export class ProductService {
  static async create(createProductDto) {
    const productEntity = ProductEntity.make(createProductDto);
    const product = await ProductRepository.save(productEntity);

    return {
      message: messages.COMMON.fn.CREATED("Product"),
      data: ProductResponseDto.from(product),
    };
  }

  static async showAll(filter) {
    const query = queryFilter(filter);
    const foundProducts = await ProductRepository.getAll(query);
    if (foundProducts.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Products"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Products"),
      data: ProductResponseDto.fromMany(foundProducts),
    };
  }

  static async get(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Product"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Product"),
      data: ProductResponseDto.from(product),
    };
  }

  static async update(id, updateProductDto) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Product"));
    }

    const productEntity = ProductEntity.make({
      ...product._doc,
      ...updateProductDto,
    });

    const updatedProduct = await ProductRepository.updateOne(id, productEntity);

    return {
      message: messages.COMMON.fn.UPDATED("Product"),
      data: ProductResponseDto.from(updatedProduct),
    };
  }

  static async delete(id) {
    await ProductRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Product"),
    };
  }
}
