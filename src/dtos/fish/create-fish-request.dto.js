export class CreateFishRequestDto {
  constructor({ user, category, date, quantity, mortality, weight, status }) {
    this.user = user;
    this.category = category;
    this.date = Date.now();
    this.quantity = quantity;
    this.mortality = mortality;
    this.weight = weight;
    this.status = "Pending";
  }

  static from({ user, category, date, quantity, weight, mortality, status }) {
    return new CreateFishRequestDto({
      user,
      category,
      date,
      quantity,
      weight,
      mortality,
      status,
    });
  }
}
