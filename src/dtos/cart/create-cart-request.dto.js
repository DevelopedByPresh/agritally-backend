export class CreateCartRequestDto {
  constructor({ user, active, cartItems, total }) {
    this.user = user;
    this.active = active;
    this.cartItems = cartItems;
    this.total = total;
  }

  static from({ user, active, cartItems, total }) {
    return new CreateCartRequestDto({
      user,
      active,
      cartItems,
      total,
    });
  }
}
