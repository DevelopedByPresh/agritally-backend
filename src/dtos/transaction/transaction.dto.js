class TransactionDTO {
  constructor({ id, orderId, type, amount, date, createdAt, updatedAt }) {
    this.id = id;
    this.orderId = orderId;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(transactionEntity) {
    return new TransactionDTO({
      id: transactionEntity.id,
      orderId: transactionEntity.orderId,
      type: transactionEntity.type,
      amount: transactionEntity.amount,
      date: transactionEntity.date,
      createdAt: transactionEntity.createdAt,
      updatedAt: transactionEntity.updatedAt,
    });
  }

  static fromMany(transactionEntities) {
    return transactionEntities.map((transactionEntity) =>
      TransactionDTO.from(transactionEntity)
    );
  }
}

export default TransactionDTO;
