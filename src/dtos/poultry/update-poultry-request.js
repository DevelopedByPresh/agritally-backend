export class UpdatePigRequestDto {
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
    this.updatedAt = new Date();
  }

  static from({
    category,
    pen,
    room,
    quantity,
    mortality,
  }) {
    return new UpdatePigRequestDto({
      category,
      pen,
      room,
      quantity,
      mortality,
    });
  }
}
