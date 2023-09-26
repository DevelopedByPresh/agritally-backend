const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../middleware/errorHandler.middleware");
const cartService = require("../services/cart.service");

class PoultryController {
  async addToCart(req, res) {
    try {
      const cart = await cartService.createCart(req.body);

      res.json(cart);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartService.getOne(id);

      res.json(cart);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const carts = await cartService.getAll();

      res.json(carts);
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      const updateCartItem = await cartService.updateCartItem(id, req.body);

      res.json(updateCartItem);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async removeCartItem(req, res) {
    try {
      const { id } = req.params;
      const removeCartItem = await cartService.removeCartItem(id, req.body);

      res.json(removeCartItem);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCart = await cartService.delete(id);

      res.json(deletedCart);
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

module.exports = new PoultryController();
