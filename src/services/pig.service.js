const Pig = require("../models/pig.model");
const User = require("../models/user.model");

class PigService {
  async addPigItem(pigDTO) {
    const newPig = new Pig(pigDTO);
    const savedPig = await newPig.save();
    return savedPig;
  }

  async getOne(id) {
    const pig = await Pig.findById(id).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
    return pig;
  }

  async getAll(filter) {
    const pigItems = await Pig.find(filter).populate({
      path: "user",
      select: ["firstName", "lastName"],
    });
    return pigItems;
  }

  async updatePigItem(itemId, updateDto) {
    const updatedItem = await Pig.findByIdAndUpdate(itemId, updateDto, {
      new: true,
    });
    return updatedItem;
  }

  async delete(id) {
    const pig = await Pig.findById(id);
    return pig;
  }
}

module.exports = new PigService();
