export class UpdateFishRequestDto {
  constructor({
    user,
    category,
    date,
    quantity,
    price,
    weight,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.price = price;
    this.weight = weight;
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
    status,
  }) {
    return new UpdateFishRequestDto({
      user,
      category,
      date,
      quantity,
      price,
      weight,
      status,
    });
  }
}
