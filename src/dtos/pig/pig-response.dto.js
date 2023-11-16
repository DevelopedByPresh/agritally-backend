export class PigResponseDto {
  constructor({
    id,
    pen,
    category,
    room,
    quantity,
    mortality,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.pen = pen;
    this.category = category;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    pen,
    category,
    room,
    quantity,
    mortality,
    createdAt,
    updatedAt,
  }) {
    return new PigResponseDto({
      id,
      pen,
      category,
      room,
      quantity,
      mortality,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(pigs) {
    return pigs.map((pig) => PigResponseDto.from(pig));
  }
}
