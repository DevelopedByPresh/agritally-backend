import Id from "../../lib/id.js";
import { ValidationException } from "../../utils/exceptions/index.js";
import { messages } from "../../utils/messages.utils.js";

export class EggEntity {
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
  }

  static make({
    _id,
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
  }) {
    if (_id && !Id.isValidId(_id)) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        id: 'Egg must have a valid id',
      });
    }

    if (!Breed) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        Breed: 'Egg must have a breed',
      });
    }

    if (!penNumber) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        penNumber: 'Egg must have a pen number',
      });
    }

    if (!totalBirdHoused) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        totalBirdHoused: 'Egg must specify the total birds housed',
      });
    }

    if (!ageHoused) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        ageHoused: 'Egg must specify the age of birds housed',
      });
    }

    if (!date) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        date: 'Egg must have a date',
      });
    }

    if (!openingBalance) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        openingBalance: 'Egg must specify the opening balance',
      });
    }

    if (!culls) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        culls: 'Egg must specify the number of culls',
      });
    }

    if (!closingBalance) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        closingBalance: 'Egg must specify the closing balance',
      });
    }

    if (!waterConsumption) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        waterConsumption: 'Egg must specify water consumption',
      });
    }

    if (!feedConsumption) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        feedConsumption: 'Egg must specify feed consumption',
      });
    }

    if (!eggCollection) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        eggCollection: 'Egg must specify egg collection details',
      });
    }

    if (!remark) {
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, {
        remark: 'Egg must have a remark',
      });
    }

    return this.#create({
      id: _id,
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
    });
  }

  static #create({
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
    id = Id.makeId(),
  }) {
    return new EggEntity({
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
    });
  }
}
