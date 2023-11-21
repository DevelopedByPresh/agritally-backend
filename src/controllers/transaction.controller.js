import {TransactionService } from '../services/index.js'
import { BaseHttpResponse } from '../utils/base-http-response.utils.js';


export class TransactionController {
    static create = async (req, res) => {
        const { message, data} = await TransactionService.create(req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static showAll = async (req, res) => {
        const { message, data} = await TransactionService.all(req.query);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static one = async (req, res) => {
        const { message, data} = await TransactionService.one(req.params.id);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static modify = async (req, res) => {
        const { message, data} = await TransactionService.update(req.params.id, req.body);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(201).json(response);
    }

    static destroy = async (req, res) => {
        const { message, data} = await TransactionService.delete(req.params.id);
        const response = BaseHttpResponse.success(message, data);
        
        res.status(200).json(response);
    }
}