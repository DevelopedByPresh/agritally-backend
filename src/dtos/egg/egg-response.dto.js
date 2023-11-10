export class EggResponseDto {
  constructor({
    id,
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
    firstTray,
    secondTray,
    thirdTray,
    cracks,
    remark,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
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
    this.firstTray = firstTray;
    this.secondTray = secondTray;
    this.thirdTray = thirdTray;
    this.cracks = cracks;
    this.remark = remark;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
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
    firstTray,
    secondTray,
    thirdTray,
    cracks,
    remark,
    createdAt,
    updatedAt,
  }) {
    return new EggResponseDto({
      id,
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
      firstTray,
      secondTray,
      thirdTray,
      cracks,
      remark,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(eggs) {
    return eggs.map((egg) => EggResponseDto.from(egg));
  }
}
