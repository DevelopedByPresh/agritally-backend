export class EggResponseDto {
  constructor({
    id,
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
    firstTray,
    secondTray,
    thirdTray,
    cracks,
    remark,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
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
    this.firstTray = firstTray;
    this.secondTray = secondTray;
    this.thirdTray = thirdTray;
    this.cracks = cracks;
    this.remark = remark;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    id,
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
    firstTray,
    secondTray,
    thirdTray,
    cracks,
    remark,
    status,
    createdAt,
    updatedAt,
  }) {
    return new EggResponseDto({
      id,
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
      firstTray,
      secondTray,
      thirdTray,
      cracks,
      remark,
      status,
      createdAt,
      updatedAt,
    });
  }

  static fromMany(eggs) {
    return eggs.map((egg) => EggResponseDto.from(egg));
  }
}
