export class OrderResponseDto {
  constructor({ id, user, cartId, total, status, updatedAt }) {
    this.id = id;
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
    this.updatedAt = updatedAt;
  }

  static from({ id, user, cartId, total, status, updatedAt }) {
    return new OrderResponseDto({
      id,
      user,
      cartId,
      total,
      status,
      updatedAt,
    });
  }

  static fromMany(orders) {
    return orders.map((order) => OrderResponseDto.from(order));
  }
}
