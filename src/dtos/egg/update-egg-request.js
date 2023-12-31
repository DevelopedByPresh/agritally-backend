export class UpdateEggRequestDto {
  constructor({
    user,
    category,
    penNumber,
    totalBirdHoused,
    ageHoused,
    date,
    openingBalance,
    mortality,
    culls,
    closingBalance,
    waterConsumption,
    feedConsumption,
    eggCollection,
    remark,
    status,
  }) {
    this.user = user;
    this.category = category;
    this.penNumber = penNumber;
    this.totalBirdHoused = totalBirdHoused;
    this.ageHoused = ageHoused;
    this.date = date;
    this.openingBalance = openingBalance;
    this.mortality = mortality;
    this.culls = culls;
    this.closingBalance = closingBalance;
    this.waterConsumption = waterConsumption;
    this.feedConsumption = feedConsumption;
    this.eggCollection = eggCollection;
    this.remark = remark;
    this.status = status;
    this.updatedAt = new Date();
  }

  static from({
    user,
    category,
    penNumber,
    totalBirdHoused,
    ageHoused,
    openingBalance,
    mortality,
    culls,
    closingBalance,
    waterConsumption,
    feedConsumption,
    eggCollection,
    remark,
    status,
  }) {
    return new UpdateEggRequestDto({
      user,
      category,
      penNumber,
      totalBirdHoused,
      ageHoused,
      openingBalance,
      mortality,
      culls,
      closingBalance,
      waterConsumption,
      feedConsumption,
      eggCollection,
      remark,
      status,
    });
  }
}
