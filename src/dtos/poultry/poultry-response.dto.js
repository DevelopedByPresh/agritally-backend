export class PoultryResponseDto {
  constructor({
    id,
    user,
    category,
    date,
    quantity,
    mortality,
    status,
    openingBalance,
    closingBalance,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    user,
    category,
    date,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status,
    createdAt,
    updatedAt,
  }) {
    return new PoultryResponseDto({
      id,
      user,
      category,
      date,
      quantity,
      mortality,
      openingBalance,
      closingBalance,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(poultries) {
    return poultries.map((poultry) => PoultryResponseDto.from(poultry));
  }
}
