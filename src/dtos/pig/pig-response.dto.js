export class PigResponseDto {
  constructor({
    id,
    category,
    pen,
    room,
    quantity,
    mortality,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.category = category;
    this.pen = pen;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    category,
    pen,
    room,
    quantity,
    mortality,
    createdAt,
    updatedAt,
  }) {
    return new PigResponseDto({
      id,
      category,
      pen,
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
