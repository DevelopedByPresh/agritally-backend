export class UpdatePoultryRequestDto {
  constructor({
    category,
    date,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({
    category,
    date,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    return new UpdatePoultryRequestDto({
      category,
      date,
      quantity,
      mortality,
      openingBalance,
      closingBalance,
      status,
    });
  }
}
