import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
export default Workout;
