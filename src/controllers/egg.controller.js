import { EggService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class EggController {
  static create = async (req, res) => {
    const { message, data } = await EggService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static getAll = async (req, res) => {
    const { message, data } = await EggService.al(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static create = async (req, res) => {
    const { message, data } = await EggService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static create = async (req, res) => {
    const { message, data } = await EggService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static create = async (req, res) => {
    const { message, data } = await EggService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };
}
