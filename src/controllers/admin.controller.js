import { handleError } from "../middleware/errorHandler.middleware.js";
import { AdminService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class AdminController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static register = async (req, res) => {
    try {
      const { message, data } = await AdminService.register(req.body);
      const response = BaseHttpResponse.success(message, data);

      res.status(201).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static login = async (req, res) => {
    try {
      const { message, data } = await AdminService.login(req.body);
      const response = BaseHttpResponse.success(message, data);

      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getOne = async (req, res) => {
    try {
      const { message, data } = await AdminService.getOne(req.params.id);
      const response = BaseHttpResponse.success(message, data);

      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static getAll = async (req, res) => {
    try {
      const { message, data } = await AdminService.getAll();
      const response = BaseHttpResponse.success(message, data);

      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static updateProfile = async (req, res) => {
    try {
      const { message, data } = await AdminService.updateOne(
        req.params.id,
        req.body
      );
      const response = BaseHttpResponse.success(message, data);

      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static changeUserRole = async (req, res) => {
    const { message, data } = await AdminService.changeUserRole(
      req.params.id,
      req.body
    );
    console.log(req.body, "fhdfghd");
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static deleteAdmin = async (req, res) => {
    const { message, data } = await AdminService.deleteAdmin(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}
