import { Transaction } from "../models/index.js";

export class TransactionRepository {
  static async save(recordDTO) {
    const newRecord = new Transaction(recordDTO);
    const savedRecord = await newRecord.save();
    return savedRecord;
  }

  static async findById(recordId) {
    const record = await Transaction.findById(recordId);
    return record;
  }

  static async findOne(query) {
    const record = await Transaction.findOne(query);
    return record;
  }

  static async getAll(query) {
    const records = await Transaction.find(query);
    return records;
  }

  static async updateOne(recordId, updateDto) {
    const updatedRecord = await Transaction.findByIdAndUpdate(
      recordId,
      updateDto,
      {
        new: true,
      }
    );
    return updatedRecord;
  }

  static async deleteOne(recordId) {
    const deletedRecord = await Transaction.findByIdAndRemove(recordId);
    return deletedRecord;
  }
}
