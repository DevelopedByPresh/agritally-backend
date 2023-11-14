import { Schema, model } from 'mongoose';

const roomSchema = new Schema(
  {
    rooms: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Rooms = model('Rooms', roomSchema);
