import { ProductService } from "../services/index.js";
import { BaseHttpResponse } from '../utils/base-http-response.utils.js';

export class ProductController {
  static createProduct = async (req, res) => {
    const { message, data } = await ProductService.createProduct(req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(201).json(response);
  };

  static getOne = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await ProductService.getOne(id);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await ProductService.getAll(req.query);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static updateProductItem = async (req, res) => {
    const { message, data } = await ProductService.updateProductItem(req.params, req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await ProductService.delete(id);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };
}
