export class OrderReponseDTO {
  constructor({ id, user, cartId, total, status, updatedAt }) {
    this.id = id;
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
    this.updatedAt = updatedAt;
  }

  static from({ id, user, cartId, total, status, updatedAt }) {
    return new OrderReponseDTO({
      id,
      user,
      cartId,
      total,
      status,
      updatedAt,
    });
  }

  static fromMany(orders) {
    return orders.map((order) => OrderReponseDTO.from(order));
  }
}
