class CartDTO {
  constructor({ id, user, active, cartItems, total, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.active = active;
    this.cartItems = cartItems;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(cartEntity) {
    return new CartDTO({
      id: cartEntity.id,
      user: cartEntity.user,
      active: cartEntity.active,
      cartItems: cartEntity.cartItems,
      total: cartEntity.total,
      createdAt: cartEntity.createdAt,
      updatedAt: cartEntity.updatedAt,
    });
  }

  static fromMany(cartEntities) {
    return cartEntities.map((cartEntity) => CartDTO.from(cartEntity));
  }
}

module.exports = CartDTO;
