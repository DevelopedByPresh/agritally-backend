class CatFishDTO {
  constructor(id, size, date, quantity, weight) {
    this.id = id;
    this.size = size;
    this.date = date;
    this.quantity = quantity;
    this.weight = weight;
  }

  static fromEntity(catFishEntity) {
    return new CatFishDTO({
      id: catFishEntity._id,
      size: catFishEntity.size,
      date: catFishEntity.date,
      quantity: catFishEntity.quantity,
      weight: catFishEntity.weight,
    });
  }
}

module.exports = CatFishDTO;
