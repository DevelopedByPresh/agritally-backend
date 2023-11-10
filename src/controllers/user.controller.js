import { handleError } from "../middleware/errorHandler.middleware.js";
import { UserService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class UserController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static register = async (req, res) => {
    const { message, data } = await UserService.register(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static login = async (req, res) => {
    const { message, data } = await UserService.login(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getOne = async (req, res) => {
    const { message, data } = await UserService.getOne(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll = async (req, res) => {
    const { message, data } = await UserService.getAll();
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static updateProfile = async (req, res) => {
    const { message, data } = await UserService.updateOne(req.params.id, req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static deleteUser = async (req, res) => {
    const { message, data } = await UserService.deleteUser(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(204).json(response);
  };
}
