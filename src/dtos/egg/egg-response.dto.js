export class EggResponseDto {
  constructor({
    id,
    Breed,
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
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.Breed = Breed;
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
    Breed,
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
    createdAt,
    updatedAt,
  }) {
    return new EggResponseDto({
      id,
      Breed,
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
      createdAt,
      updatedAt,
    });
  }

  static fromMany(eggs) {
    return eggs.map((egg) => EggResponseDto.from(egg));
  }
}
