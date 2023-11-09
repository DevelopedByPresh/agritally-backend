export class CreateOrderRequestDTO {
  constructor({ user, cartId, total, status }) {
    this.user = user;
    this.cartId = cartId;
    this.total = total;
    this.status = status;
  }

  static from({ user, cartId, total, status }) {
    return new CreateOrderRequestDTO({
      user,
      cartId,
      total,
      status,
    });
  }
}
