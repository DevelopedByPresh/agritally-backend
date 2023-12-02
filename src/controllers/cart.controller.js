import { CartService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class CartController {
  static addToCart = async (req, res) => {
    // console.log(req.body)
    const { message, data } = await CartService.createCart(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static getOne = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await CartService.get(id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static fetchUserCart = async (req, res) => {
    const { userId } = req.params;
    const { active } = req.query;
    const { message, data } = await CartService.getUserCart(userId, active);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await CartService.showAll(req.query);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await CartService.updateCartItem(id, req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static removeCartItem = async (req, res) => {
    const id = req.params.id;
    const productId = req.query.productId
    const { message, data } = await CartService.removeCartItem(id, productId);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static updateCart = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await CartService.updateCart(id, req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const { message, data } = await CartService.delete(id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}
