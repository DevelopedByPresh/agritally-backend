const { STATUS_CODE } = require('../utils/constants');
const handleError = require('../middleware/errorHandler.middleware');
const PigDto = require('../dtos/pig/pig.Dto');
const pigService = require('../services/pig.service');

class PigController {
  async addPigItem(req, res) {
    try {
      const newPigItem = req.body;
      const pigItem = await pigService.addPigItem(newPigItem);

      const pigDto = PigDto.fromPig(pigItem);

      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: 'Created successfully', data: pigDto });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const pigItem = await pigService.getOne(id);

      const pigDto = PigDto.fromPig(pigItem);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Pig found', data: pigDto });
    } catch (error) {
      console.error(error);
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

      const pigItems = await pigService.getAll(query);

      const pigDtos = PigDto.fromMany(pigItems);

      return res.status(STATUS_CODE.OK).json({
        message: 'Pig items found',
        count: pigDtos.length,
        data: pigDtos,
      });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updatePigItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatedPigItem = await pigService.updatePigItem(id, updateDto);

      if (!updatedPigItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Item not found' });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Item updated', data: updatedPigItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const pigItem = await pigService.delete(id);

      if (!pigItem)
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Pig not found' });

      await pigItem.deleteOne();
      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Pig Item Deleted' });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }
}

module.exports = new PigController();
