export class CreateFishRequestDto {
  constructor({ user, category, date, quantity, mortality, weight, openingBalance, closingBalance, status }) {
    this.user = user;
    this.category = category;
    this.date = Date.now();
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.weight = weight;
  }

  static from({
    user,
    category,
    date,
    quantity,
    weight,
    mortality,
    openingBalance,
    closingBalance,
  }) {
    return new CreateFishRequestDto({
      user,
      category,
      date,
      quantity,
      weight,
      mortality,
      openingBalance,
      closingBalance,
    });
  }
}
