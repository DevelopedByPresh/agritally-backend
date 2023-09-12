const { STATUS_CODE } = require("../utils/constants");
const handleError = require("../middleware/errorHandler.middleware");
const PoultryDto = require("../dtos/poultry/poultry.Dto");
const poultryService = require("../services/poultry.service");

class PoultryController {
  async addPoultryItem(req, res) {
    try {
      const newPoultryItem = req.body;
      const poultryItem = await poultryService.addPoultryItem(newPoultryItem);

      const poultryDto = PoultryDto.fromPoultry(poultryItem);

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

      const poultryDto = PoultryDto.fromPoultry(poultryItem);

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
      const { section } = req.query;
      const poultryItems = await poultryService.getAll(section);

      const poultryDtos = poultryItems.map(PoultryDto.fromPoultry);


      return res
        .status(STATUS_CODE.OK)
        .json({ message: "Poultry items found", data: poultryDtos });
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }
  }

  async updatePoultryItem(req, res) {
    try {
      const { id } = req.params;
      const updateDto = req.body;

      const updatepolutryItem = await poultryService.updatePoultryItem(id, updateDto);

      if (!updatepolutryItem) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "Item not found" });
      }

      return res.status(STATUS_CODE.OK).json({ message: "Item updated", data: updatepolutryItem });
    } catch (error) {
      return handleError(error, res);
    }
  }

  //TODO: filter by date, month, yearly
}

module.exports = new PoultryController();
