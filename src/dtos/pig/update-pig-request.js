export class UpdatePigRequestDto {
  constructor({
    user,
    category,
    pen,
    room,
    quantity,
    mortality,
  }) {
    this.user = user;
    this.category = category;
    this.pen = pen;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.updatedAt = new Date();
  }

  static from({
    user,
    category,
    pen,
    room,
    quantity,
    mortality,
  }) {
    return new UpdatePigRequestDto({
      user,
      category,
      pen,
      room,
      quantity,
      mortality,
    });
  }
}
