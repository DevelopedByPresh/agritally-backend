class OrderDTO {
  constructor({ id, user, cartId, total, trackingNo, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.trackingNo = trackingNo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(orderEntity) {
    return new OrderDTO({
      id: orderEntity.id,
      user: orderEntity.user,
      cartId: orderEntity.cartId,
      total: orderEntity.total,
      trackingNo: orderEntity.trackingNo,
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
