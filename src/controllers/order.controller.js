const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../middleware/errorHandler.middleware");
const orderService = require("../services/order.service");

class orderController {
  async createOrder(req, res) {
    try {
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

  async updateOrderItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatepolutryItem = await orderService.updateOrderItem(
        id,
        updateDto
      );

      if (!updatepolutryItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Item not found" });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Item updated", data: updatepolutryItem });
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
          .json({ error: "Product not found" });

      await orderItem.deleteOne();
      return res.status(STATUS_CODE.OK).json({ message: "Order Item Deleted" });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

module.exports = new orderController();
