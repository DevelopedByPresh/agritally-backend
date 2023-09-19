const CatFish = require("../models/cat-fish.model");

class CatFishService {
  async addCatFishItem(catFishDTO) {
    const newCatFish = new CatFish(catFishDTO);
    const savedCatFish = await newCatFish.save();
    return savedCatFish;
  }

  async getOne(id) {
    const catFish = await CatFish.findById(id);
    return catFish;
  }

  async getAll(filter) {
    const catFishItems = await CatFish.find(filter);
    return catFishItems;
  }

  async updateCatFishItem(itemId, updateDto) {
    const updatedItem = await CatFish.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const catFish = await CatFish.findById(id);
    return catFish;
  }
}

module.exports = new CatFishService();
