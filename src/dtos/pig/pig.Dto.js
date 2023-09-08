class PigDTO {
  constructor(id, size, date, quantity, weight) {
    this.id = id;
    this.size = size;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
  }

  static fromEntity(pigEntity) {
    return new PigDTO({
      id: pigEntity._id,
      size: pigEntity.size,
      date: pigEntity.date,
      quantity: pigEntity.quantity,
      weight: pigEntity.weight,
    });
  }
}

module.exports = PigDTO;
