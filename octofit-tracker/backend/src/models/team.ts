import mongoose, { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: String }],
    focus: { type: String },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
export default Team;
