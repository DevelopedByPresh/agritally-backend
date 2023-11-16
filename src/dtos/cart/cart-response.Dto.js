export class CartResponseDto {
  constructor({
    id,
    user,
    productId,
    active,
    cartItems,
    total,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.productId = productId;
    this.active = active;
    this.cartItems = cartItems;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    user,
    productId,
    active,
    cartItems,
    total,
    createdAt,
    updatedAt,
  }) {
    return new CartResponseDto({
      id,
      user,
      productId,
      active,
      cartItems,
      total,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(cartEntities) {
    return cartEntities.map((cartEntity) => CartResponseDto.from(cartEntity));
  }
}
