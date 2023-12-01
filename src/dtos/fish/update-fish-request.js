export class UpdateFishRequestDto {
  constructor({
    user,
    category,
    date,
    quantity,
    price,
    weight,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.price = price;
    this.weight = weight;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({
    user,
    category,
    date,
    quantity,
    price,
    weight,
    mortality,
    openingBalance,
    closingBalance,
    status,
  }) {
    return new UpdateFishRequestDto({
      user,
      category,
      date,
      quantity,
      price,
      weight,
      mortality,
      openingBalance,
      closingBalance,
      status,
    });
  }
}
