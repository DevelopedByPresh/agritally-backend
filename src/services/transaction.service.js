import { TransactionRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import {
  validateTransaction,
  updateTransactionValidator,
} from "../validators/index.js";
import TransactionDTO from "../dtos/transaction/transaction.dto.js";
import filterSelection from "../utils/queryFilter.js";

export class TransactionService {
  static async create(transactionDTO) {
    validateTransaction(transactionDTO);
    const newTransaction = await TransactionRepository.save(transactionDTO);

    const transaction = TransactionDTO.from(newTransaction);

    return {
      message: "Transaction created",
      data: transaction,
    };
  }

  static async all(filter) {
    const query = filterSelection(filter);
    const transactions = await TransactionRepository.getAll(query);

    const allTransaction = TransactionDTO.fromMany(transactions);

    return {
      message: "Transactions fetched",
      data: allTransaction,
    };
  }

  static async one(id) {
    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    const transactionDto = TransactionDTO.from(transaction);

    return {
      message: "Transaction fetched",
      data: transactionDto,
    };
  }

  static async update(id, updateDto) {
    const transaction = await TransactionRepository.updateOne(id, updateDto);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    const transactionDto = TransactionDTO.from(transaction);

    return {
      message: "Transaction updated",
      data: transactionDto,
    };
  }

  static async delete(id) {
    const transaction = await TransactionRepository.deleteOne(id);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    return {
      message: "Transaction deleted",
    };
  }
}
