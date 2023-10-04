import { STATUS_CODE } from '../utils/constants.js';
import { handleError } from '../middleware/errorHandler.middleware.js';
import orderService from '../services/order.service.js';

class OrderController {
  async createOrder(req, res) {
    try {
      const { user, cartId } = req.body;
      const order = await orderService.createOrder(req.body);

      res.json(order);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await orderService.getOne(id);

      res.json(orderItem);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const orderItems = await orderService.getAll(req.query);

      res.json(orderItems);
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async getAllUserOrder(req, res) {
    try {
      const orderItems = await orderService.getAllByUser(req.query.id);

      res.json(orderItems);
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateOrderItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatedOrderItem = await orderService.updateOrderItem(id, updateDto);

      if (!updatedOrderItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Item not found' });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Item updated', data: updatedOrderItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const orderItem = await orderService.delete(id);

      if (!orderItem)
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Product not found' });

      await orderItem.deleteOne();
      return res.status(STATUS_CODE.OK).json({ message: 'Order Item Deleted' });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

export default new OrderController();
