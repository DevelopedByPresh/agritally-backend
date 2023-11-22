import { Fish } from "../models/index.js";

export class FishRepository {
  static async save(fishDTO) {
    const newFish = new Fish(fishDTO);
    const savedFish = await newFish.save();
    return savedFish;
  }

  static async getAll(query) {
    return Fish.find(query);
  }

  static async findById(fishId) {
    const fish = await Fish.findById(fishId);
    return fish;
  }

  static async getStatistics(query) {
    const statistics = await Fish.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          totalMortality: { $sum: "$mortality" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }

  static async updateOne(fishId, updateDto) {
    const updatedFish = await Fish.findByIdAndUpdate(fishId, updateDto, {
      new: true,
    });
    return updatedFish;
  }

  static async deleteOne(fishId) {
    const deletedFish = await Fish.findByIdAndDelete(fishId);
    return deletedFish;
  }
}
