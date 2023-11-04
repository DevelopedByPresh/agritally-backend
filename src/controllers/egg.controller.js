import { EggService } from "../services/index.js";
import { BaseHttpResponse } from "../utils/base-http-response.utils.js";

export class EggController {
  static create = async (req, res) => {
    const { message, data } = await EggService.create(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  static showAll = async (req, res) => {
    const { message, data } = await EggService.showAll(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static get = async (req, res) => {
    const { message, data } = await EggService.get(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static update = async (req, res) => {
    const { message, data } = await EggService.update(req.params.id, req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static delete = async (req, res) => {
    const { message, data } = await EggService.delete(req.params.id);
    const response = BaseHttpResponse.success(message, data);

    res.status(204).json(response);
  };
}
