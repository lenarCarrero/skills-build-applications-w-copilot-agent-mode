import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
export default Leaderboard;
