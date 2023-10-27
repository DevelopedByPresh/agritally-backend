import { AdminService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class AdminController {
  static register = async (req, res) => {
    const { message, data } = await AdminService.register(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static login = async (req, res) => {
    const { message, data } = await AdminService.login(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getOne = async (req, res) => {
    const { message, data } = await AdminService.getOne(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await AdminService.getAll();
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static updateProfile = async (req, res) => {
    const { message, data } = await AdminService.updateOne(
      req.params,
      req.body
    );
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static changeUserRole = async (req, res) => {
    const { message, data } = await AdminService.changeUserRole(
      req.params,
      req.body
    );
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static deleteAdmin = async (req, res) => {
    const { message, data } = await AdminService.deleteAdmin(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(204).json(response);
  };
}
