export class PoultryResponseDto {
  constructor({
    id,
    user,
    category,
    date,
    quantity,
    mortality,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.mortality = mortality;
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
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(poultries) {
    return poultries.map((poultry) => PoultryResponseDto.from(poultry));
  }
}
