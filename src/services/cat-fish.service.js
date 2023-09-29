import CatFish from "../data/models/cat-fish.model.js";
import User from "../data/models/user.model.js";

class CatFishService {
  async addCatFishItem(catFishDTO) {
    const newCatFish = new CatFish(catFishDTO);
    const savedCatFish = await newCatFish.save();
    return savedCatFish;
  }

  async getOne(id) {
    const catFish = await CatFish.findById(id).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
    console.log(catFish);
    return catFish;
  }

  async getAll(filter) {
    const catFishItems = await CatFish.find(filter).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
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

export default new CatFishService();
