import { Pig } from "../models/index.js";

export class PigRepository {
  static async save(pigDTO) {
    const newPig = new Pig(pigDTO);
    const savedPig = await newPig.save();
    return savedPig;
  }

  static async getAll(query) {
    return Pig.find(query);
  }

  static async findById(pigId) {
    const pig = await Pig.findById(pigId);
    return pig;
  }

  static async updateOne(pigId, updateDto) {
    const updatedPig = await Pig.findByIdAndUpdate(pigId, updateDto, {
      new: true,
    });
    return updatedPig;
  }

  static async getStatistics(query) {
    const statistics = await Pig.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: null,
          totalMortality: { $sum: "$mortality" },
          // Add more fields based on your Pig model attributes
        },
      },
    ]);

    const stats = statistics[0] || {};

    // Calculate additional statistics based on your Pig model attributes
    // For example, if you have a field 'totalWeight', you can calculate it like this:
    const totalWeight = stats.totalWeight || 0;

    return {
      stats,
      totalWeight,
      // Add more calculated fields as needed
    };
  }

  static async deleteOne(pigId) {
    const deletedPig = await Pig.findByIdAndDelete(pigId);
    return deletedPig;
  }
}
