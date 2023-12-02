export class CartResponseDto {
  constructor({
    id,
    user,
    productId,
    cartItems,
    active,
    total,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.productId = productId;
    this.cartItems = cartItems;
    this.active = active;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    user,
    productId,
    cartItems,
    active,
    total,
    createdAt,
    updatedAt,
  }) {
    return new CartResponseDto({
      id,
      user,
      productId,
      cartItems,
      active,
      total,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(cartEntities) {
    return cartEntities.map((cartEntity) => CartResponseDto.from(cartEntity));
  }
}
