export class UpdateProductRequestDTO {
  constructor({
    user,
    category,
    section,
    date,
    quantity,
    price,
    weight,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.price = price;
    this.status = status;
  }

  static from({
    user,
    category,
    section,
    date,
    quantity,
    price,
    weight,
    status,
  }) {
    return new UpdateProductRequestDTO({
      user,
      category,
      section,
      date,
      quantity,
      price,
      weight,
      status,
    });
  }
}
