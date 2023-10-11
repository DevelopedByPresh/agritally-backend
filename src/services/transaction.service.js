import { TransactionRepository } from "../data/repository/index.js";
import { NotFoundException } from "../utils/exceptions/not-found.exception.js";
import {
  validateTransaction,
  updateTransactionValidator,
} from "../validators/index.js";
import TransactionDTO from "../dtos/transaction/transaction.dto.js";
import filterSelection from "../utils/queryFilter.js";

class TransactionService {
  async create(transactionDTO) {
    validateTransaction(transactionDTO);
    const newTransaction = await TransactionRepository.save(transactionDTO);

    const transaction = TransactionDTO.from(newTransaction);

    return {
      message: "Transaction created",
      data: transaction,
    };
  }

  async all(filter) {
    const query = filterSelection(filter);
    const transactions = await TransactionRepository.getAll(query);

    const allTransaction = TransactionDTO.fromMany(transactions);

    return {
      message: "Transactions fetched",
      count: allTransaction.length,
      data: allTransaction,
    };
  }

  async one(id) {
    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException("Transaction ot found");
    }

    const transactionDto = TransactionDTO.from(transaction);

    return {
      message: "Transactions fetched",
      data: transactionDto,
    };
  }

  async update(id, updateDto) {
    const transaction = await TransactionRepository.updateOne(id, updateDto);

    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }

    const transactionDto = TransactionDTO.from(transaction);

    return {
      message: "Transactions updated",
      data: transactionDto,
    };
  }

  async delete(id) {
    const transaction = await TransactionRepository.deleteOne(id);

    if (!transaction) {
        throw new NotFoundException("Transaction not found");
      }

      return {
        message: "Transactions deleted",
        data: transaction,
      };
  }
}
