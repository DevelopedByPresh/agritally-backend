class EggDTO {
  constructor({ id, user, section, date, quantity, status, createdAt, updatedAt}) {
    this.id = id;
    this.user = user;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(eggEntity) {
    return new EggDTO({
      id: eggEntity.id,
      user: eggEntity.user,
      section: eggEntity.section,
      date: eggEntity.date,
      quantity: eggEntity.quantity,
      status: eggEntity.status,
      createdAt: eggEntity.createdAt,
      updatedAt: eggEntity.updatedAt
    });
  }
  static fromMany(eggEntities) {
    return eggEntities.map((eggEntity) => EggDTO.from(eggEntity));
  }
}

module.exports = EggDTO;
