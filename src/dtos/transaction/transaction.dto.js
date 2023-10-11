class TransactionDTO {
  constructor({ id, productId, type, amount, date, createdAt, updatedAt }) {
    this.id = id;
    this.productId = productId;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(transactionEntity) {
    return new TransactionDTO({
      id: transactionEntity.id,
      productId: transactionEntity.productId,
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
