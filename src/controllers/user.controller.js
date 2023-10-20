import { handleError } from "../middleware/errorHandler.middleware.js";
import { UserService } from "../services/index.js";
import { BaseHttpResponse } from '../utils/base-http-response.utils.js';

export class UserController {
  static register = async (req, res) => {
    const { message, data } = await UserService.register(req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(201).json(response);
  };

  static login = async (req, res) => {
    const { message, data } = await UserService.login(req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static getOne = async (req, res) => {
    const { message, data } = await UserService.getOne(req.params.id);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await UserService.getAll();
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  };

  static updateProfile = async (req, res) => {
    const { message, data } = await UserService.updateOne(req.params, req.body);
    const response = BaseHttpResponse.success(message, data);
    res.status(200).json(response);
  }

  static deleteUser = async (req, res) => {
    const { message, data } = await UserService.deleteUser(req.params.id);
    const response = BaseHttpResponse.success(message, data);
    res.status(204).json(response);
  };
}
