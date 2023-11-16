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
          totalPen1: { $sum: { $cond: [{ $eq: ["$pen", 1] }, "$quantity", 0] } },
          totalPen2: { $sum: { $cond: [{ $eq: ["$pen", 2] }, "$quantity", 0] } },
          totalPen3: { $sum: { $cond: [{ $eq: ["$pen", 3] }, "$quantity", 0] } },
          totalPen4: { $sum: { $cond: [{ $eq: ["$pen", 4] }, "$quantity", 0] } },
          },
      },
    ]);

    const stats = statistics|| {};
    console.log(statistics, "fgthe")

    return {
      stats,

      // Add more calculated fields as needed
    };
  }

  static async deleteOne(pigId) {
    const deletedPig = await Pig.findByIdAndDelete(pigId);
    return deletedPig;
  }
}
