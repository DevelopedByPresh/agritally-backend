class OrderDTO {
  constructor({ id, user, cartId, total, status, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(orderEntity) {
    return new OrderDTO({
      id: orderEntity.id,
      user: orderEntity.user,
      cartId: orderEntity.cartId,
      total: orderEntity.total,
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

export default OrderDTO;
