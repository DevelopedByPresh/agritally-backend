import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "../middleware/errorHandler.middleware.js";
import PoultryDto from "../dtos/poultry/poultry.Dto.js";
import poultryService from "../services/poultry.service.js";

class PoultryController {
  async addPoultryItem(req, res) {
    try {
      const newPoultryItem = req.body;
      const poultryItem = await poultryService.addPoultryItem(newPoultryItem);

      const poultryDto = PoultryDto.from(poultryItem);

      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: "Created successfully", data: poultryDto });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const poultryItem = await poultryService.getOne(id);

      const poultryDto = PoultryDto.from(poultryItem);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Poultry found", data: poultryDto });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const { date, month, year, section } = req.query;
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

      const poultryItems = await poultryService.getAll(query);

      const poultryDtos = PoultryDto.fromMany(poultryItems);

      return res.status(STATUS_CODE.OK).json({
        message: "Poultry items found",
        count: poultryDtos.length,
        data: poultryDtos,
      });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updatePoultryItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatePoultryItem = await poultryService.updatePoultryItem(
        id,
        updateDto
      );

      if (!updatePoultryItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Item not found" });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Item updated", data: updatePoultryItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const poultryItem = await poultryService.delete(id);

      if (!poultryItem)
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Product not found" });

      await poultryItem.deleteOne();
      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Poultry Item Deleted" });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

export default new PoultryController();
