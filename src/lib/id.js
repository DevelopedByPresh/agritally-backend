import mongoose from 'mongoose';

export default class Id {
  static makeId() {
    return new mongoose.Types.ObjectId();
  }

  static isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
