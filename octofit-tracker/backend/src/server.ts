import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', apiUrl });
});

app.get(['/api/config', '/api/config/'], (_req, res) => {
  res.json({ apiUrl, port });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    fitnessGoal: req.body.fitnessGoal,
    age: req.body.age,
    city: req.body.city,
  });

  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = await Team.create({
    name: req.body.name,
    members: req.body.members || [],
    focus: req.body.focus,
  });

  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = await Activity.create({
    userId: req.body.userId,
    type: req.body.type,
    durationMinutes: req.body.durationMinutes,
    date: req.body.date,
    calories: req.body.calories,
  });

  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({ points: -1 }).lean();
  res.json(leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const entry = await Leaderboard.create({
    userId: req.body.userId,
    name: req.body.name,
    points: req.body.points,
    rank: req.body.rank,
  });

  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = await Workout.create({
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
