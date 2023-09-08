class EggDTO {
  constructor(id, size, date, quantity) {
    this.id = id;
    this.size = size;
    this.date = date;
    this.quantity = quantity;
  }

  static fromEntity(eggEntity) {
    return new EggDTO({
      id: eggEntity._id,
      size: eggEntity.size,
      date: eggEntity.date,
      quantity: eggEntity.quantity,
    });
  }
}

module.exports = EggDTO;
