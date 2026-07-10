import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: String, required: true },
    calories: { type: Number },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
export default Activity;
