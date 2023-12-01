export class CreatePoultryRequestDto {
  constructor({
    user,
    category,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.date = new Date();
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
  }

  static from({
    user,
    category,
    date,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    return new CreatePoultryRequestDto({
      user,
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
