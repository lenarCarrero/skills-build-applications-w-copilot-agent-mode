"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            { name: 'Ava Martinez', email: 'ava@example.com', fitnessGoal: 'Strength', age: 29, city: 'Austin' },
            { name: 'Noah Chen', email: 'noah@example.com', fitnessGoal: 'Endurance', age: 31, city: 'Denver' },
            { name: 'Mia Patel', email: 'mia@example.com', fitnessGoal: 'Mobility', age: 27, city: 'Seattle' },
        ]);
        await team_1.Team.insertMany([
            { name: 'Peak Performers', members: ['Ava Martinez', 'Noah Chen'], focus: 'Strength and conditioning' },
            { name: 'Morning Movers', members: ['Mia Patel'], focus: 'Mobility and recovery' },
        ]);
        await activity_1.Activity.insertMany([
            { userId: users[0]._id, type: 'Run', durationMinutes: 35, date: '2026-07-10', calories: 420 },
            { userId: users[1]._id, type: 'Cycling', durationMinutes: 50, date: '2026-07-10', calories: 510 },
            { userId: users[2]._id, type: 'Yoga', durationMinutes: 30, date: '2026-07-10', calories: 180 },
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id, name: 'Ava Martinez', points: 1250, rank: 1 },
            { userId: users[1]._id, name: 'Noah Chen', points: 1120, rank: 2 },
            { userId: users[2]._id, name: 'Mia Patel', points: 980, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            { title: 'HIIT Cardio', difficulty: 'Intermediate', durationMinutes: 25, focus: 'Cardio' },
            { title: 'Core Strength', difficulty: 'Beginner', durationMinutes: 20, focus: 'Core' },
            { title: 'Recovery Flow', difficulty: 'Beginner', durationMinutes: 15, focus: 'Mobility' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
