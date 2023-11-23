export class FishResponseDto {
  constructor({
    id,
    user,
    category,
    date,
    quantity,
    price,
    weight,
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
    this.price = price;
    this.weight = weight;
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
    price,
    weight,
    status,
    mortality,
    createdAt,
    updatedAt,
  }) {
    return new FishResponseDto({
      id,
      user,
      category,
      date,
      quantity,
      price,
      weight,
      mortality,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(fishList) {
    return fishList.map((fish) => FishResponseDto.from(fish));
  }
}
