export class UpdatePoultryRequestDto {
  constructor({
    category,
    date,
    quantity,
    mortality,
    status,
  }) {
    this.category = category;
    this.date = date;
    this.quantity = quantity;
    this.mortality = mortality;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({
    category,
    date,
    quantity,
    mortality,
    status,
  }) {
    return new UpdatePoultryRequestDto({
      category,
      date,
      quantity,
      mortality,
      status,
    });
  }
}