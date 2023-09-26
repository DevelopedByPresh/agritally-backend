const Pig = require("../data/models/pig.model");
const { STATUS_CODE } = require("../utils/constants");
const PigDto = require("../dtos/pig/pig.Dto");

class PigService {
  async addPigItem(createPigDto) {
    const addPigProduct = new Pig(createPigDto);
    const savedItem = await addPigProduct.save();

    const pigDto = PigDto.fromPig(savedItem);

    return {
      status: STATUS_CODE.CREATED,
      message: "Created successfully",
      data: pigDto,
    };
  }

  async getOne(id) {
    const pig = await Pig.findById(id);

    const pigDto = PigDto.fromPig(pig);

    return {
      status: STATUS_CODE.CREATED,
      message: "Created successfully",
      data: pigDto,
    };
  }
}

module.exports = new PigService();
