export class UpdateEggRequestDto {
  constructor({
    breed,
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
  }) {
    this.breed = breed;
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
    this.updatedAt = new Date();
  }

  static from({
    breed,
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
  }) {
    return new UpdateEggRequestDto({
      breed,
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
    });
  }
}
