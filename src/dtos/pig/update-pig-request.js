export class UpdatePigRequestDto {
  constructor({
    user,
    category,
    pen,
    room,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status
  }) {
    this.user = user;
    this.category = category;
    this.pen = pen;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({
    user,
    category,
    pen,
    room,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
    status
  }) {
    return new UpdatePigRequestDto({
      user,
      category,
      pen,
      room,
      quantity,
      mortality,
      openingBalance,
      closingBalance,
      status
    });
  }
}
