class PoultryDTO {
  constructor({id, section, date, quantity, createdAt, updatedAt}) {
    this.id = id;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(poultryEntity) {
    return new PoultryDTO({
      id: poultryEntity.id,
      section: poultryEntity.section,
      date: poultryEntity.date,
      quantity: poultryEntity.quantity,
      createdAt: poultryEntity.createdAt,
      updatedAt: poultryEntity.updatedAt
    });
  }

  static fromMany(poultryEntities) {
    return poultryEntities.map((poultryEntity) => PoultryDTO.from(poultryEntity));
  }
}

module.exports = PoultryDTO;
