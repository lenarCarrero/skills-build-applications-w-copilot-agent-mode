"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', apiUrl });
});
app.get(['/api/config', '/api/config/'], (_req, res) => {
    res.json({ apiUrl, port });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json(users);
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await user_1.User.create({
        name: req.body.name,
        email: req.body.email,
        fitnessGoal: req.body.fitnessGoal,
        age: req.body.age,
        city: req.body.city,
    });
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await team_1.Team.create({
        name: req.body.name,
        members: req.body.members || [],
        focus: req.body.focus,
    });
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await activity_1.Activity.create({
        userId: req.body.userId,
        type: req.body.type,
        durationMinutes: req.body.durationMinutes,
        date: req.body.date,
        calories: req.body.calories,
    });
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({}).sort({ points: -1 }).lean();
    res.json(leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const entry = await leaderboard_1.Leaderboard.create({
        userId: req.body.userId,
        name: req.body.name,
        points: req.body.points,
        rank: req.body.rank,
    });
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await workout_1.Workout.create({
        title: req.body.title,
        difficulty: req.body.difficulty,
        durationMinutes: req.body.durationMinutes,
        focus: req.body.focus,
    });
    res.status(201).json(workout);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
});
