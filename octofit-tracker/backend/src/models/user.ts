import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    age: { type: Number },
    city: { type: String },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export default User;
