export class UpdateCartRequestDto {
  constructor({ user, productId, active, cartItems, total }) {
    this.user = user;
    this.productId = productId;
    this.active = active;
    this.cartItems = cartItems;
    this.total = total;
    this.updatedAt = new Date();
  }

  static from({ user, productId, active, cartItems, total }) {
    return new UpdateCartRequestDto({
      user,
      productId,
      active,
      cartItems,
      total,
    });
  }
}
