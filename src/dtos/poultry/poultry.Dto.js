class PoultryDTO {
  constructor({ id, user, section, date, quantity, status, createdAt, updatedAt }) {
    this.id = id;
    this.user = user;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(poultryEntity) {
    return new PoultryDTO({
      id: poultryEntity.id,
      user: poultryEntity.user,
      section: poultryEntity.section,
      date: poultryEntity.date,
      quantity: poultryEntity.quantity,
      status: poultryEntity.status,
      createdAt: poultryEntity.createdAt,
      updatedAt: poultryEntity.updatedAt,
    });
  }

  static fromMany(poultryEntities) {
    return poultryEntities.map((poultryEntity) =>
      PoultryDTO.from(poultryEntity)
    );
  }
}

module.exports = PoultryDTO;
