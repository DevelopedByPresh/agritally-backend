export class CreatePigRequestDto {
  constructor({
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
  }) {
    this.user = user;
    this.pen = pen;
    this.category = category;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
  }

  static from({
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
  }) {
    return new CreatePigRequestDto({
      user,
      pen,
      category,
      room,
      quantity,
      mortality,
    });
  }
}
