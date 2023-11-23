export class CreatePoultryRequestDto {
  constructor({
    user,
    category,
    quantity,
    mortality,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.date = new Date();
    this.quantity = quantity;
    this.mortality = mortality;
    this.status = status;
  }

  static from({
    user,
    category,
    date,
    quantity,
    mortality,
    status,
  }) {
    return new CreatePoultryRequestDto({
      user,
      category,
      date,
      quantity,
      mortality,
      status,
    });
  }
}
