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
          _id: "$pen",
          totalMortality: { $sum: "$mortality" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: {
          _id: 1, 
        },
      },
    ]);

    const stats = {};
    let totalMortality = 0;
    let totalQuantity = 0;

    statistics.forEach((penStat) => {
      const penNumber = penStat._id;
      const penMortality = penStat.totalMortality;
      const penQuantity = penStat.totalQuantity;

      stats[`pen${penNumber}`] = {
        totalMortality: penMortality,
        totalQuantity: penQuantity,
      };

      totalMortality += penMortality;
      totalQuantity += penQuantity;
    });

    stats.totalMortality = totalMortality;
    stats.totalQuantity = totalQuantity;

    return stats;
  }

  static async deleteOne(pigId) {
    const deletedPig = await Pig.findByIdAndDelete(pigId);
    return deletedPig;
  }
}
