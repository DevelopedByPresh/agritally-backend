class PigDTO {
  constructor({id, section, date, quantity, weight, createdAt, updatedAt}) {
    this.id = id;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPig(pigEntity) {
    return new PigDTO({
      id: pigEntity.id,
      section: pigEntity.section,
      date: pigEntity.date,
      quantity: pigEntity.quantity,
      weight: pigEntity.weight,
      createdAt: pigEntity.createdAt,
      updatedAt: pigEntity.updatedAt
    });
  }
}

module.exports = PigDTO;
