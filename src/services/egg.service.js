import Egg from "../data/models/egg.model.js";
import { STATUS_CODE } from "../utils/constants.js";
import EggDto from "../dtos/egg/egg.Dto.js";

class EggService {
  async addEggItem(createEggDto) {
    const addEggProduct = new Egg(createEggDto);
    const savedItem = await addEggProduct.save();
    return savedItem;
  }

  async getOne(id) {
    const egg = await Egg.findById(id).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return egg;
  }

  async getAll(filter) {
    const eggItems = await Egg.find(filter).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return eggItems;
  }

  async updateEggItem(itemId, updateDto) {
    const updatedItem = await Egg.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const deleteEgg = await Egg.findById(id);

    return deleteEgg;
  }
}

export default new EggService();
