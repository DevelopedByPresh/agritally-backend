import {TransactionService } from '../services/index.js'
import { BaseHttpResponse } from '../utils/base-http-response.utils.js';


export class TransactionController {
    static create = async (req, res) => {
        const { message, data} = await TransactionService.create(req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static showAll = async (req, res) => {
        const { message, data} = await TransactionService.all(req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static one = async (req, res) => {
        const { message, data} = await TransactionService.one(req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static modify = async (req, res) => {
        const { message, data} = await TransactionService.update(req.params, req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static destroy = async (req, res) => {
        const { message, data} = await TransactionService.delete(req.params);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }
}