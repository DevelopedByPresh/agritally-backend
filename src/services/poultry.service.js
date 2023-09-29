import Poultry from "../data/models/poultry.model.js";
import User from "../data/models/user.model.js";

class PoultryService {
  async addPoultryItem(poultryDTO) {
    const newPoultry = new Poultry(poultryDTO);

    const savedPoultry = await newPoultry.save();
    return savedPoultry;
  }

  async getOne(id) {
    const poultry = await Poultry.findById(id).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return poultry;
  }

  async getAll(filter) {
    const poultryItems = await Poultry.find(filter).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });

    return poultryItems;
  }

  async updatePoultryItem(itemId, updateDto) {
    const updatedItem = await Poultry.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const poultry = await Poultry.findById(id);

    return poultry;
  }
}

export default new PoultryService();
