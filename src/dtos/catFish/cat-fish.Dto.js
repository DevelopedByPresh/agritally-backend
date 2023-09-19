class CatFishDTO{
  constructor({id, size, date, quantity, weight, createdAt, updatedAt}) {
    this.id = id;
    this.size = size;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(catFishEntity) {
    return new CatFishDTO({
      id: catFishEntity._id,
      size: catFishEntity.size,
      date: catFishEntity.date,
      quantity: catFishEntity.quantity,
      weight: catFishEntity.weight,
      createdAt: catFishEntity.createdAt,
      updatedAt: catFishEntity.updatedAt
    });
  }

  static fromMany(catFishEntities) {
    return catFishEntities.map((catFishEntity) => CatFishDTO.from(catFishEntity));
  }
}

module.exports = CatFishDTO;

