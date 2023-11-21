export class CreateFishRequestDto {
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
    this.date = date || new Date();
    this.quantity = quantity;
    this.price = price;
    this.weight = weight || "0 kg";
    this.status = status || "Pending";
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
    return new CreateFishRequestDto({
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
