const Egg = require('../models/egg.model');
const { STATUS_CODE } = require('../utils/constants');
const EggDto = require('../dtos/egg/egg.Dto');

class EggService {
  async addEggItem(createEggDto) {
    const addEggProduct = new Egg(createEggDto);
    const savedItem = await addEggProduct.save();
    return savedItem
  }

  async getOne(id) {
    const egg = await Egg.findById(id);

    const eggDto = EggDto.fromEgg(egg);

    return {
      status: STATUS_CODE.OK,
      message: 'Egg found',
      data: eggDto,
    };
  }

  async getAll(query) {
    const eggItems = await Egg.find(query);

    const eggDtos = eggItems.map(EggDto.fromEgg);

    return {
      status: STATUS_CODE.OK,
      message: 'Egg items found',
      count: eggDtos.length,
      data: eggDtos,
    };
  }

  async updateEggItem(itemId, updateDto) {
    const updatedItem = await Egg.findByIdAndUpdate(itemId, updateDto, { new: true });

    if (!updatedItem) {
      throw new Error('Egg item not found');
    }

    const eggDto = EggDto.fromEgg(updatedItem);

    return {
      status: STATUS_CODE.OK,
      message: 'Egg item updated',
      data: eggDto,
    };
  }

  async delete(id) {
    const deleteEgg = await Egg.findById(id);

    return deleteEgg;
  }
}

module.exports = new EggService();
