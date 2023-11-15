export class CreatePigRequestDto {
  constructor({
    category,
    pen,
    room,
    quantity,
    mortality,
  }) {
    this.category = category;
    this.pen = pen;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
  }

  static from({
    category,
    pen,
    room,
    quantity,
    mortality,
  }) {
    return new CreatePigRequestDto({
      category,
      pen,
      room,
      quantity,
      mortality,
    });
  }
}
