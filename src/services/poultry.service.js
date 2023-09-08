const Poultry = require("../models/poultry.model");
const bcryptHelper = require("../lib/bcrypt");

class PoultryService {
  async addPoultryItem(poultryDTO) {
    const newPoultry = new Poultry(poultryDTO);
    const savedPoultry = await newPoultry.save();
    return savedPoultry;
  }

  async getOne(id) {
    const poultry = await Poultry.findById(id);

    return poultry;
  }

  async getAll(section) {
    const filter = {};

    if (section) {
      filter.section = section;
    }

    const poultryItems = await Poultry.find(filter);

    return poultryItems;
  }
}

module.exports = new PoultryService();
