export class CreatePigRequestDto {
  constructor({
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
  }) {
    this.user = user;
    this.pen = pen;
    this.category = category;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
  }

  static from({
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
  }) {
    return new CreatePigRequestDto({
      user,
      pen,
      category,
      room,
      quantity,
      mortality,
      openingBalance,
      closingBalance,
    });
  }
}
