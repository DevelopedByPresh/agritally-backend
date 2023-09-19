const { STATUS_CODE } = require('../utils/constants');
const handleError = require('../middleware/errorHandler.middleware');
const CatFishDto = require('../dtos/catFish/cat-fish.Dto');
const catFishService = require('../services/cat-fish.service');

class CatFishController {
  async addCatFishItem(req, res) {
    try {
      const newCatFishItem = req.body;
      const catFishItem = await catFishService.addCatFishItem(newCatFishItem);

      const catFishDto = CatFishDto.fromCatFish(catFishItem);

      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: 'Created successfully', data: catFishDto });
    } catch (error) {
      console.error(error.message);
      return handleError(error, res);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const catFishItem = await catFishService.getOne(id);

      const catFishDto = CatFishDto.fromCatFish(catFishItem);

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'CatFish found', data: catFishDto });
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

      const catFishItems = await catFishService.getAll(query);
      
      const catFishDto = CatFishDto.fromMany(catFishItems);
      console.log(catFishDto)

      return res.status(STATUS_CODE.OK).json({
        message: 'CatFish items found',
        // count: catFishDtos.length,
        data: catFishDto
      });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }

  async updateCatFishItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatedCatFishItem = await catFishService.updateCatFishItem(id, updateDto);

      if (!updatedCatFishItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Item not found' });
      }

      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'Item updated', data: updatedCatFishItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const catFishItem = await catFishService.delete(id);

      if (!catFishItem) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'CatFish not found' });
      }

      await catFishItem.deleteOne();
      return res
        .status(STATUS_CODE.OK)
        .json({ message: 'CatFish Item Deleted' });
    } catch (error) {
      console.error(error);
      return handleError(error, res);
    }
  }
}

module.exports = new CatFishController();
