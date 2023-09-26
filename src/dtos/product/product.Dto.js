class ProductDTO {
  constructor({ id, user, category, section, date, quantity, price, weight, status, createdAt, updatedAt }) {
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

  static from(productEntity) {
    return new ProductDTO({
      id: productEntity.id,
      user: productEntity.user,
      category: productEntity.category,
      section: productEntity.section,
      date: productEntity.date,
      quantity: productEntity.quantity,
      weight: productEntity.weight,
      price: productEntity.price,
      status: productEntity.status,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.updatedAt,
    });
  }

  static fromMany(productEntities) {
    return productEntities.map((productEntity) =>
      ProductDTO.from(productEntity)
    );
  }
}

module.exports = ProductDTO;
