export class UpdateOrderRequestDTO {
  constructor({ user, cartId, total, status }) {
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({ user, cartId, total, status }) {
    return new UpdateOrderRequestDTO({
      user,
      cartId,
      total,
      status,
    });
  }
}
