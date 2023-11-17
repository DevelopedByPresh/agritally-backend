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
    const updatedPoultry = await Poultry.findByIdAndUpdate(poultryId, updateDto, {
      new: true,
    });
    return updatedPoultry;
  }

  static async getStatistics(query) {
    // Modify this method based on your specific requirements for poultry statistics
    // You can use the aggregation framework similar to the EggRepository

    // Sample implementation:
    // const statistics = await Poultry.aggregate([
    //   {
    //     $match: query,
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalQuantity: { $sum: "$quantity" },
    //       totalMortality: { $sum: "$mortality" },
    //       // Add more aggregation stages as needed
    //     },
    //   },
    // ]);

    // // Process the statistics and return the result
    // const stats = statistics[0] || {};
    // return stats;

    // Note: Modify the aggregation stages based on your specific use case.
  }

  static async deleteOne(poultryId) {
    const deletedPoultry = await Poultry.findByIdAndDelete(poultryId);
    return deletedPoultry;
  }
}
