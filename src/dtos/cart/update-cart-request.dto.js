export class UpdateCartRequestDto {
    constructor({ user, active, cartItems, total }) {
      this.user = user;
      this.active = active;
      this.cartItems = cartItems;
      this.total = total;
      this.updatedAt = new Date();
    }
  
    static from({ user, active, cartItems, total }) {
      return new UpdateCartRequestDto({
        user,
        active,
        cartItems,
        total,
      });
    }
  }
  