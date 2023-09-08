class PoultryDTO {
  constructor(id, section, date, quantity) {
    this.id = id;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
  }

  static fromPoultry(poultryEntity) {
    return new PoultryDTO({
      id: poultryEntity._id,
      section: poultryEntity.section,
      date: poultryEntity.date,
      quantity: poultryEntity.quantity,
    });
  }
}

module.exports = PoultryDTO;
