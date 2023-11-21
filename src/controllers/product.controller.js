import { ProductService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class ProductController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create = async (req, res) => {
    const { message, data } = await ProductService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static showAll = async (req, res) => {
    const { message, data } = await ProductService.showAll(req.query);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static get = async (req, res) => {
    const { message, data } = await ProductService.get(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update = async (req, res) => {
    const { message, data } = await ProductService.update(
      req.params.id,
      req.body
    );
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete = async (req, res) => {
    const { message, data } = await ProductService.delete(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}
