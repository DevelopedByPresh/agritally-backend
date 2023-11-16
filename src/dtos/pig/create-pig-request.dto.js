export class CreatePigRequestDto {
  constructor({
    pen,
    category,
    room,
    quantity,
    mortality,
  }) {
    this.pen = pen;
    this.category = category;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
  }

  static from({
    pen,
    category,
    room,
    quantity,
    mortality,
  }) {
    return new CreatePigRequestDto({
      pen,
      category,
      room,
      quantity,
      mortality,
    });
  }
}
