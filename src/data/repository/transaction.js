import Transaction from "../models/transaction.model.js";

class TransactionRepository {
  async create(recordDTO) {
    const newRecord = new Transaction(recordDTO);
    const savedRecord = await newRecord.save();
    return savedRecord;
  }

  async findById(recordId) {
    const record = await Transaction.findById(recordId);
    return record;
  }

  async findOne(query) {
    const record = await Transaction.findOne(query);
    return record;
  }

  async updateOne(recordId, updateDto) {
    const updatedRecord = await Transaction.findByIdAndUpdate(
      recordId,
      updateDto,
      { new: true }
    );
    return updatedRecord;
  }

  async deleteOne(recordId) {
    const deletedRecord = await Transaction.findByIdAndRemove(recordId);
    return deletedRecord;
  }

  async getAll(query) {
    const records = await Transaction.find(query);
    return records;
  }
}

export default new TransactionRepository();
