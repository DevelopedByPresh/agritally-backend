export class PigResponseDto {
  constructor({
    id,
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.user = user;
    this.pen = pen;
    this.category = category;
    this.room = room;
    this.quantity = quantity;
    this.mortality = mortality;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
    status,
    createdAt,
    updatedAt,
  }) {
    return new PigResponseDto({
      id,
      user,
      pen,
      category,
      room,
      quantity,
      mortality,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(pigs) {
    return pigs.map((pig) => PigResponseDto.from(pig));
  }
}
