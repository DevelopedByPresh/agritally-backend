export class ProductResponseDto {
  constructor({
    id,
    user,
    category,
    section,
    date,
    quantity,
    price,
    weight,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.category = category;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.price = price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    user,
    category,
    section,
    date,
    quantity,
    price,
    weight,
    status,
    createdAt,
    updatedAt,
  }) {
    return new ProductResponseDto({
      id,
      user,
      category,
      section,
      date,
      quantity,
      price,
      weight,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(products) {
    return products.map((product) => ProductResponseDto.from(product));
  }
}
