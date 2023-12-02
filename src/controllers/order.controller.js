import { OrderService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class OrderController {
  static createOrder = async (req, res) => {
    const { message, data } = await OrderService.createOrder(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static getOne = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await OrderService.getOne(id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await OrderService.showAll(req.query);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getAllUserOrder = async (req, res) => {
    const { id } = req.query;
    const { message, data } = await OrderService.getAllByUser(req.query.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static update = async (req, res) => {
    const { message, data } = await OrderService.update( req.params.id, req.body );
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await OrderService.delete(id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}
