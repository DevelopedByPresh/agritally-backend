class CatFishDTO{
  constructor({id, user, section, date, quantity, weight, status, createdAt, updatedAt}) {
    this.id = id;
    this.user = user;
    this.section = section;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(catFishEntity) {
    return new CatFishDTO({
      id: catFishEntity.id,
      user: catFishEntity.user,
      section: catFishEntity.section,
      date: catFishEntity.date,
      quantity: catFishEntity.quantity,
      weight: catFishEntity.weight,
      status: catFishEntity.status,
      createdAt: catFishEntity.createdAt,
      updatedAt: catFishEntity.updatedAt
    });
  }

  static fromMany(catFishEntities) {
    return catFishEntities.map((catFishEntity) => CatFishDTO.from(catFishEntity));
  }
}

module.exports = CatFishDTO;

