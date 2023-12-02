export class UpdateCartItemsRequestDto {
    constructor({ productId, quantity, total }) {
      this.productId = productId;
      this.quantity = quantity;
      this.total = total;
      this.updatedAt = new Date();
    }
  
    static from({ productId, quantity, total }) {
      return new UpdateCartItemsRequestDto({
        productId,
        quantity,
        total,
      });
    }
  }
  