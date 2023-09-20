class PigDTO {
  constructor({id, user, section, date, quantity, weight, createdAt, updatedAt}) {
    this.id = id;
    this.user = user;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(pigEntity) {
    return new PigDTO({
      id: pigEntity.id,
      user: pigEntity.user,
      section: pigEntity.section,
      date: pigEntity.date,
      quantity: pigEntity.quantity,
      weight: pigEntity.weight,
      createdAt: pigEntity.createdAt,
      updatedAt: pigEntity.updatedAt
    });
  }

  static fromMany(pigEntities) {
    return pigEntities.map((pigEntity) => PigDTO.from(pigEntity));
  }
}

module.exports = PigDTO;
