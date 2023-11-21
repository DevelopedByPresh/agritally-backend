import { PigService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class PigController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static create = async (req, res) => {
    const { message, data } = await PigService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static showAll = async (req, res) => {
    const { message, data } = await PigService.showAll(req.query);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static get = async (req, res) => {
    const { message, data } = await PigService.get(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static update = async (req, res) => {
    const { message, data } = await PigService.update(req.params.id, req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static statistics = async (req, res) => {
    const { message, data } = await PigService.getStatistics(req.query);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static delete = async (req, res) => {
    const { message, data } = await PigService.delete(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}
