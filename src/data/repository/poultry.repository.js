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

    const stats = {};
    let totalQuantity = 0;
    let totalMortality = 0;

    statistics.forEach((poultryStat) => {
      const poultryCategory = poultryStat._id;
      const poultryQuantity = poultryStat.totalQuantity;
      const poultryMortality = poultryStat.totalMortality;

      stats[`${poultryCategory}`] = {
        totalQuantity: poultryQuantity,
        totalMortality: poultryMortality,
      };

      totalQuantity += poultryQuantity;
      totalMortality += poultryMortality;
    });

    stats.totalQuantity = totalQuantity;
    stats.totalMortality = totalMortality;
    return stats;
  }

  static async deleteOne(poultryId) {
    const deletedPoultry = await Poultry.findByIdAndDelete(poultryId);
    return deletedPoultry;
  }
}
