class OrderDTO {
  constructor({ id, user, product, price, quantity, status, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(orderEntity) {
    return new OrderDTO({
      id: orderEntity.id,
      user: orderEntity.user,
      product: orderEntity.product,
      price: orderEntity.price,
      quantity: orderEntity.quantity,
      status: orderEntity.status,
      createdAt: orderEntity.createdAt,
      updatedAt: orderEntity.updatedAt,
    });
  }

  static fromMany(orderEntities) {
    return orderEntities.map((orderEntity) =>
      OrderDTO.from(orderEntity)
    );
  }
}

module.exports = OrderDTO;
