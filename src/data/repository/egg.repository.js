import { Egg } from "../models/index.js";

export class EggRepository {
  static async save(eggDTO) {
    const newEgg = new Egg(eggDTO);
    const savedEgg = await newEgg.save();
    return savedEgg;
  }

  static async getAll() {
    return Egg.find();
  }

  static async findById(eggId) {
    const egg = await Egg.findById(eggId);
    return egg;
  }

  static async updateOne(eggId, updateDto) {
    const updatedEgg = await Egg.findByIdAndUpdate(eggId, updateDto, {
      new: true,
    });
    return updatedEgg;
  }

  static async deleteOne(eggId) {
    const deletedEgg = await Egg.findByIdAndDelete(eggId);
    return deletedEgg;
  }
}
