const { STATUS_CODE } = require('../utils/constants');
const handleError = require('../middleware/errorHandler.middleware');
const EggDto = require('../dtos/egg/egg.Dto');
const eggService = require('../services/egg.service');

class EggController {
  async addEggItem(req, res) {
    try {
      const newEggItem = req.body;
      const eggItem = await eggService.addEggItem(newEggItem);

      const eggDto = EggDto.fromEgg(eggItem);

      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: 'Created successfully', data: eggDto });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const eggItem = await eggService.getOne(id);

      const eggDto = EggDto.fromEgg(eggItem);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Egg found', data: eggDto });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async getAll(req, res) {
    try {
      const { date, month, year, size } = req.query;
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

      // Add size filter if provided
      if (size) {
        query.size = size;
      }

      const eggItems = await eggService.getAll(query);

      return res.status(STATUS_CODE.OK).json({
        message: 'Egg items found',
        count: eggItems.count,
        data: eggItems.data,
      });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateEggItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatedEggItem = await eggService.updateEggItem(id, updateDto);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Egg item updated', data: updatedEggItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eggItem = await eggService.delete(id);

      if (!eggItem)
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: "Product not found" });

      await eggItem.deleteOne();
      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Product Deleted"});
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }
}

module.exports = new EggController();
