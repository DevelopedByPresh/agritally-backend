import { Poultry } from "../models/index.js";

export class PoultryRepository {
  static async save(poultryDTO) {
    const newPoultry = new Poultry(poultryDTO);
    const savedPoultry = await newPoultry.save();
    return savedPoultry;
  }

  static async getAll(query) {
    return Poultry.find(query);
  }

  static async findById(poultryId) {
    const poultry = await Poultry.findById(poultryId);
    return poultry;
  }

  static async updateOne(poultryId, updateDto) {
    const updatedPoultry = await Poultry.findByIdAndUpdate(
      poultryId,
      updateDto,
      {
        new: true,
      }
    );
    return updatedPoultry;
  }

  static async getStatistics(query) {
    const statistics = await Poultry.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$category",
          totalLayerCategory: { $sum: "$quantity" },
          totalMortality: { $sum: "$mortality" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const stats = statistics || {};
    // console.log(stats.reduce(), "Stats");
    return stats;
  }

  static async deleteOne(poultryId) {
    const deletedPoultry = await Poultry.findByIdAndDelete(poultryId);
    return deletedPoultry;
  }
}
