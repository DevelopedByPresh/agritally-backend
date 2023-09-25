const { STATUS_CODE } = require("../utils/constants");
const {handleError} = require("../middleware/errorHandler.middleware");
const ProductDto = require("../dtos/product/product.Dto");
const productService = require("../services/product.service");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);

      // const ProductDto = ProductDto.from(ProductItem);

      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: "Created successfully", data: product });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const ProductItem = await productService.getOne(id);

      const productDto = ProductDto.from(ProductItem);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Product found", data: productDto });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const { section, year, month, date, category  } = req.query;
      let query = {};

      if (date && month && year) {
        // If all three parameters are provided, filter by the entire day
        const startDate = new Date(year, month - 1, date);
        const endDate = new Date(year, month - 1, date + 1);
        query.date = { $gte: startDate, $lt: endDate };
      } else if (month && year) {
        // If only year and month are provided, filter by the entire month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        query.date = { $gte: startDate, $lte: endDate };
      } else if (year) {
        // If only the year is provided, filter by the entire year
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        query.date = { $gte: startDate, $lte: endDate };
      }

      // Add section filter if provided
      if (section) {
        query.section = section;
      }
  
      if (category) {
        query.category = category;
      }

      const productItems = await productService.getAll(query);

      const productDtos = ProductDto.fromMany(productItems);

      return res.status(STATUS_CODE.OK).json({
        message: "Product items found",
        count: productDtos.length,
        data: productDtos,
      });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateProductItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updateproductItem = await productService.updateProductItem(
        id,
        updateDto
      );

      if (!updateproductItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Item not found" });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Item updated", data: updateproductItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const productItem = await productService.delete(id);

      if (!productItem)
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Product not found" });

      await productItem.deleteOne();
      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Product Item Deleted" });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

module.exports = new ProductController();
