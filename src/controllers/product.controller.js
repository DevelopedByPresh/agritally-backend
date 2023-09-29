import { handleError } from "../middleware/errorHandler.middleware.js";
import productService from "../services/product.service.js";

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.json(product);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getOne(id);
      res.json(product);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getAll(req.query);
      res.json(products);
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateProductItem(req, res) {
    try {
      const updateProductItem = await productService.updateProductItem(
        req.params,
        req.body
      );
      res.json(updateProductItem);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const productItem = await productService.delete(id);
      res.json(productItem);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

export default new ProductController();
