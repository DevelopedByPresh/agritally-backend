const Pig = require("../models/pig.model");
const { STATUS_CODE } = require("../utils/constants");
const PigDto = require("../dtos/pig/pig.Dto");

class PigService {
  async addPigItem(createPigDto) {
      const addProduct = new Pig(createPigDto);
      const savedItem = await addProduct.save();

      const pigDto = PigDto.fromPig(savedItem);

      return {
        status: STATUS_CODE.CREATED,
        message: "Created successfully",
        data: pigDto,
      };
  }

}

module.exports = new PigService();
