import { OrderService } from "../services/index.js";
import { BaseHttpResponse } from '../utils/base-http-response.utils.js';

export class OrderController {
  static createOrder = async (req, res) => {
    const { user, cartId } = req.body;
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
    const { message, data } = await OrderService.getAll(req.query);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static getAllUserOrder = async (req, res) => {
    const { id } = req.query;
    const { message, data } = await OrderService.getAllByUser(id);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static updateOrder = async (req, res) => {
    const { id } = req.params;
    const updateDto = req.body;
    const updatedOrder = await OrderService.updateOrder(req.params, updateDto);
    if (!updatedOrder) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Item not found' });
    }
    res.status(STATUS_CODE.OK).json({ message: 'Item updated', data: updatedOrder });
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await OrderService.delete(id);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };
}
