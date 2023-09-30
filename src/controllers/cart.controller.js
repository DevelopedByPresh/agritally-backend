import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import cartService from "../services/cart.service.js";

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
      const { cartId, productId } = req.query;
      const removeCartItem = await cartService.removeCartItem(req.query);

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

export default new PoultryController();
