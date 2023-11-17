export class CartItemDto {
  constructor({ productId, price, quantity = 1, subtotal }) {
    this.productId = productId;
    this.price = price;
    this.quantity = quantity;
    this.subtotal = subtotal;
  }

  static from({ productId, price, quantity, subtotal }) {
    return new CartItemDto({ productId, price, quantity, subtotal });
  }
}

export class CreateCartRequestDto {
  constructor({ user, cartItems=[], active = true, total }) {
    this.user = user;
    this.cartItems = cartItems.map((item) => CartItemDto.from(item));
    this.active = active;
    this.total = total;
  }

  static from({ user, cartItems=[], active, total }) {
    return new CreateCartRequestDto({ user, cartItems, active, total });
  }
}
