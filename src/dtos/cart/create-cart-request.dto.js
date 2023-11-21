export class CreateCartRequestDto {
  constructor({ user, cartItems = [], active = true, total }) {
    this.user = user;
    this.cartItems = cartItems.map((item) => ({
      productId: item.productId,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));
    this.active = active;
    this.total = total;
  }

  static from({ user, cartItems = [], active, total }) {
    return new CreateCartRequestDto({ user, cartItems, active, total });
  }
}
