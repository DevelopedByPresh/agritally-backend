import { Egg } from "../models/index.js";

export class EggRepository {
  static async save(eggDTO) {
    const newEgg = new Egg(eggDTO);
    const savedEgg = await newEgg.save();
    return savedEgg;
  }

  static async getAll(query) {
    return Egg.find(query);
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

  static async getStatistics(query) {
    const statistics = await Egg.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: null,
          totalMortality: { $sum: "$mortality" },
          totalCulls: { $sum: "$culls" },
          totalEggCollection: {
            $sum: {
              $add: [
                "$eggCollection.firstTray",
                "$eggCollection.secondTray",
                "$eggCollection.thirdTray",
              ],
            },
          },
          totalCracks: { $sum: "$eggCollection.cracks" },
        },
      },
    ]);

    const stats = statistics[0] || {};

    const totalProduction = stats.totalEggCollection - stats.totalCracks || 0;

    return {
      stats,
      totalProduction,
    };
  }

  static async deleteOne(eggId) {
    const deletedEgg = await Egg.findByIdAndDelete(eggId);
    return deletedEgg;
  }
}
