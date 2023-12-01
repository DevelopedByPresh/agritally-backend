export class PigResponseDto {
  constructor({
    id,
    user,
    pen,
    category,
    room,
    quantity,
    mortality,
    openingBalance,
    closingBalance,
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
    this.openingBalance = openingBalance;
    this.closingBalance = closingBalance;
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
    openingBalance,
    closingBalance,
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
      openingBalance,
      closingBalance,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(pigs) {
    return pigs.map((pig) => PigResponseDto.from(pig));
  }
}
