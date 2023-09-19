class EggDTO {
  constructor({ id, size, date, quantity, createdAt, updatedAt}) {
    this.id = id;
    this.size = size;
    this.date = date;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(eggEntity) {
    return new EggDTO({
      id: eggEntity.id,
      size: eggEntity.size,
      date: eggEntity.date,
      quantity: eggEntity.quantity,
      createdAt: eggEntity.createdAt,
      updatedAt: eggEntity.updatedAt
    });
  }
  static fromMany(eggEntities) {
    return eggEntities.map((eggEntity) => EggDTO.from(eggEntity));
  }
}

module.exports = EggDTO;
